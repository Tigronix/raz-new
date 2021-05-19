const getFormData = (e) => {
  const form = e.target;

  const object = {};
  const formData = new FormData(form);

  for (var pair of formData.entries()) {
    object[pair[0]] = pair[1];
  }

  return object;
}

export default getFormData;