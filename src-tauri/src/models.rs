use serde::Serialize;

#[derive(Serialize)]
pub struct ExecutionResponse {
    pub success: bool,
    pub stdout: String,
    pub stderr: String,
}