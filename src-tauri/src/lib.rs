// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs;
use std::process::{Command, Stdio};
use std::time::{Duration, Instant};

mod models;
use models::ExecutionResponse;


#[tauri::command]
fn validate_project_status(project_id: &str) -> String {
    format!("Projekt {} został poprawnie zainicjowany z dysku!", project_id)
}

#[tauri::command]
fn execute_js_code(code: &str) -> Result<ExecutionResponse, String> {
    let temp_dir = std::env::temp_dir();
    let file_path = temp_dir.join("skillstack_run.js");

    if let Err(e) = fs::write(&file_path, code) {
        return Err(format!("Error during processing file: {}", e))
    }

    let mut child = Command::new("node")
        .arg(&file_path)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| format!("Error: {}", e))?;

    let timeout = Duration::from_secs(4);
    let start = Instant::now();

    let process_status = loop {
        if let Ok(Some(status)) = child.try_wait() {
            break status;
        }

        if start.elapsed() > timeout {
            let _ = child.kill();
            return Ok(ExecutionResponse {
                success: false,
                stdout: String::new(),
                stderr: "Bląd: Przekroczono limit czasu. Wykryto nieskończoną pętlę, zmuszono do zatrzymania.".to_string(),
            });
        }
        std::thread::sleep(Duration::from_millis(50));
    };
    let output = child.wait_with_output().map_err(|e| e.to_string())?;

    let stdout_text = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr_text = String::from_utf8_lossy(&output.stderr).to_string();

    Ok(ExecutionResponse {
        success: process_status.success(),
        stdout: stdout_text,
        stderr: stderr_text
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![validate_project_status, execute_js_code])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
