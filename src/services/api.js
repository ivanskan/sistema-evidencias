const URL =
//   "/api/macros/s/AKfycbzuYLi8IHTa3EYzx3XR_0Jdpk6gkIAPlCK4qAp02EOZcy8aQenpS8obIhliLvH1Z3ws/exec";
"/api/macros/s/AKfycby3uiB0b8EdhQdPncTZypaZJeN7bt8SCLvjBfafqKpNm3uLMck-t2o1y6aFSlzNYMAT/exec"

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

export async function eliminar(id) {
  return request({
    action: "delete",
    id,
  });
}

