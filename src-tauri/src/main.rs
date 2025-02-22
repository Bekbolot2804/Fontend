// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[tauri::command]
fn read_file(path: String) -> String {
    std::fs::read_to_string(path).unwrap_or_else(|_| "Ошибка чтения файла".into())
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![read_file])
      .run(tauri::generate_context!())
      .expect("Ошибка запуска Tauri");
}