
export default class RazbiratorService {
  _apiBase = 'http://test.tt/';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  async fetchFiles() {
    const res = [];

    return await res;
  }

  async getFiles(files) {
    var formData = new FormData();

    files.map((file, index) => formData.append(`file${index}`, file));

    const res = await fetch(`${this._apiBase}files.php`, {
      method: 'POST',
      body: formData
    });

    return await res.json();
  }

  async updateCrop(crop) {
    return await crop;
  }

  async getCrop(cropFile) {
    return await cropFile;
  }

  async submitForm(formData) {
    const res = await fetch(`${this._apiBase}add-product.php`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    return await res.json();
  }

  async fetchProducts() {
    const res = await fetch(`${this._apiBase}get-products.php`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
    });

    return await res.json();
  }

}