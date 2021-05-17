
export default class RazbiratorService {
  _apiBase = 'http://test.tt/';

  carBrands = [
    {
      value: 1,
      label: 'Audi'
    },
    {
      value: 2,
      label: 'BMW'
    },
    {
      value: 3,
      label: 'Volvo'
    },
  ];

  carModels = [
    {
      value: 1,
      brandId: 1,
      label: 'A4'
    },
    {
      value: 2,
      brandId: 1,
      label: 'A5'
    },
    {
      value: 3,
      brandId: 1,
      label: 'A6'
    },
    {
      value: 4,
      brandId: 1,
      label: 'A8'
    },
    {
      value: 5,
      brandId: 1,
      label: 'Q7'
    },
    {
      value: 6,
      brandId: 2,
      label: '3-Series'
    },
    {
      value: 7,
      brandId: 2,
      label: '5-Series'
    },
    {
      value: 8,
      brandId: 2,
      label: '7-Series'
    },
    {
      value: 9,
      brandId: 2,
      label: 'X5'
    },
    {
      value: 10,
      brandId: 3,
      label: 'C30'
    },
    {
      value: 11,
      brandId: 3,
      label: 'C70'
    },
    {
      value: 12,
      brandId: 3,
      label: 'S40'
    }
  ];

  getCarBrands() {
    return new Promise((resolve) => {
      resolve(this.carBrands);
    });
  }

  getCarModels() {
    return new Promise((resolve) => {
      resolve(this.carModels);
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

}