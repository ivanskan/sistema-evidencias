const URL =

//prod joo

"https://script.google.com/macros/s/AKfycbxrOhpr1Jc59xSs0vs9R_b7V4hf8OzwIHO_u7z03Sqg0_GjdwsOlHgnNvHLe1ODoKeJaw/exec"

// prod pk
"https://script.google.com/macros/s/AKfycby3uiB0b8EdhQdPncTZypaZJeN7bt8SCLvjBfafqKpNm3uLMck-t2o1y6aFSlzNYMAT/exec"
// dev pk
// "/api/macros/s/AKfycby3uiB0b8EdhQdPncTZypaZJeN7bt8SCLvjBfafqKpNm3uLMck-t2o1y6aFSlzNYMAT/exec"  

async function request(data) {

  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify(data)
  );

  const response = await fetch(URL, {
    method: "POST",
    body: formData,
  });

 const text = await response.text();

return JSON.parse(text);
}

export async function login(data) {
  return request({
    action: "login",
    ...data,
  });
}

export async function subirEvidencia(data) {
  return request({
    action: "upload",
    ...data,
  });
}

export async function listar(usuario) {
  return request({
    action: "list",
    usuario,
  });
}

export async function listarTodas() {

  return request({
    action: "listAll",
  });
}

export async function eliminar(id) {
  return request({
    action: "delete",
    id,
  });
}

