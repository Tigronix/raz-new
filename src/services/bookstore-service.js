
export default class BookstoreService {
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
      id: 1,
      brandId: '1',
      label: 'A4'
    },
    {
      id: 2,
      brandId: '1',
      label: 'A5'
    },
    {
      id: 3,
      brandId: '1',
      label: 'A6'
    },
    {
      id: 4,
      brandId: '1',
      label: 'A8'
    },
    {
      id: 5,
      brandId: '1',
      label: 'Q7'
    },
    {
      id: 6,
      brandId: '2',
      label: '3-Series'
    },
    {
      id: 7,
      brandId: '2',
      label: '5-Series'
    },
    {
      id: 8,
      brandId: '2',
      label: '7-Series'
    },
    {
      id: 9,
      brandId: '2',
      label: 'X5'
    },
    {
      id: 10,
      brandId: '3',
      label: 'C30'
    },
    {
      id: 10,
      brandId: '3',
      label: 'C70'
    },
    {
      id: 10,
      brandId: '3',
      label: 'S40'
    }
  ];

  data = [
    {
      id: 1,
      title: 'Production-Ready Microservices',
      author: 'Susan J. Fowler',
      price: 32,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/41yJ75gpV-L._SX381_BO1,204,203,200_.jpg'
    },
    {
      id: 2,
      title: 'Release It!',
      author: 'Michael T. Nygard',
      price: 45,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/414CRjLjwgL._SX403_BO1,204,203,200_.jpg'
    }
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          reject(new Error('Something bad happened'));
        } else {
          resolve(this.data);
        }


      }, 700);
    });
  }

  getCarBrands() {
    return new Promise((resolve) => {
      resolve(this.carBrands);
    });
  }

  // async getResource(url) {
  //   const res = await fetch(`${this._apiBase}${url}`, {
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify()
  //   });

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}` +
  //       `, received ${res.status}`)
  //   }
  //   return await res.json();
  // }

  // async getQuestions() {
  //   const questions = await this.getResource(`index.php`);
  //   return questions;
  // }


  // async addQuestions(question) {
  //   const res = await fetch(`${this._apiBase}add-question.php`, {
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       question
  //     })
  //   });

  //   return await res.json();
  // }

  // async deleteQuestion(questionId) {
  //   const res = await fetch(`${this._apiBase}delete-question.php`, {
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': 'http://localhost:3000/'
  //     },
  //     body: JSON.stringify({
  //       questionId
  //     })
  //   });

  //   return await res.json();
  // }

  // async editQuestion(question) {
  //   const res = await fetch(`${this._apiBase}edit-question.php`, {
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       question
  //     })
  //   });

  //   return await res.json();
  // }

}