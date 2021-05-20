
export default class RazbiratorService {
  _apiBase = 'http://test.tt/';

  carBrands = [
    {
      id: 1,
      label: 'Audi'
    },
    {
      id: 2,
      label: 'BMW'
    },
    {
      id: 3,
      label: 'Volvo'
    },
  ];

  carModels = [
    {
      id: 1,
      brandId: 1,
      label: 'A4'
    },
    {
      id: 2,
      brandId: 1,
      label: 'A5'
    },
    {
      id: 3,
      brandId: 1,
      label: 'A6'
    },
    {
      id: 4,
      brandId: 1,
      label: 'A8'
    },
    {
      id: 5,
      brandId: 1,
      label: 'Q7'
    },
    {
      id: 6,
      brandId: 2,
      label: '3-Series'
    },
    {
      id: 7,
      brandId: 2,
      label: '5-Series'
    },
    {
      id: 8,
      brandId: 2,
      label: '7-Series'
    },
    {
      id: 9,
      brandId: 2,
      label: 'X5'
    },
    {
      id: 10,
      brandId: 3,
      label: 'C30'
    },
    {
      id: 11,
      brandId: 3,
      label: 'C70'
    },
    {
      id: 12,
      brandId: 3,
      label: 'S40'
    }
  ];


  getCarModels() {
    const result = this.carModels.map(({ id: value, brandId: brandId, label: label }) => ({ value, brandId, label }));

    return new Promise((resolve) => {
      resolve(result);
    });
  }

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

  async fetchRealFiles() {

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

}