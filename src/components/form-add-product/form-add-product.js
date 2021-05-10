import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'

import { withBookstoreService } from '../hoc';
import { fetchCarBrands, brandSelected, fetchCarModels } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';
import Files from 'react-files';

import './form-add-product.css';

const FormAddProduct = ({ brandOptions, models, onBrandSelected, selectedBrand, selectedModels }) => {
  console.log(selectedModels);
  return (
    <form>
      <h2>Добавление товара</h2>
      <h2>Selected Brand:
        <span>
          {
            selectedBrand.map((brand) => {
              return (
                <span key={brand.value}>
                  <span>{brand.value}</span>
                  <span>{brand.label}</span>
                </span>
              )
            })
          }
        </span>
      </h2>
      <div className="form-group">
        <h4>Марка</h4>
        <Select
          options={brandOptions}
          onChange={(selectedBrand) => onBrandSelected(brandOptions, selectedBrand, models, selectedModels)}
          closeMenuOnSelect={false}
          isMulti
          isSearchable
        />
      </div>
      <div className="form-group">
        <h4>Модель</h4>
        <Select
          options={selectedModels}
          closeMenuOnSelect={false}
          isMulti
          isSearchable
        />
      </div>
      <div className="form-group">
        <h4>Цена</h4>
        <input className="form-control" type="text" placeholder="Цена" />
      </div>
      <div className="form-group">
        <h4>ОЕМ</h4>
        <input className="form-control" type="text" placeholder="ОЕМ" />
      </div>
      <div className="form-group">
        <h4>Загрузка картинок</h4>
        <Files
          className='files-dropzone'
          // onChange={this.onFilesChange}
          // onError={this.onFilesError}
          accepts={['image/png', '.pdf', 'audio/*']}
          multiple
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
      <button className="btn btn-primary">Добавить товар</button>
    </form>
  )
};

class FormAddProductContainer extends Component {
  componentDidMount() {
    this.props.fetchCarBrands();
    this.props.fetchCarModels();
  }

  render() {
    const { brandOptions, loading, error, selectedBrand, onBrandSelected, models, selectedModels } = this.props;

    if (loading) {
      return <Spinner></Spinner>;
    }

    if (error) {
      return <ErrorIndicator></ErrorIndicator>
    }

    return <FormAddProduct
      selectedBrand={selectedBrand}
      brandOptions={brandOptions}
      onBrandSelected={onBrandSelected}
      models={models}
      selectedModels={selectedModels}
    ></FormAddProduct>
  }
}

const mapStateToProps = ({ car: { brandOptions, loading, error, selectedBrand, models, selectedModels } }) => {
  return { brandOptions, loading, error, selectedBrand, models, selectedModels };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchCarBrands: fetchCarBrands(bookstoreService, dispatch),
    fetchCarModels: fetchCarModels(bookstoreService, dispatch),
    onBrandSelected: (brandOptions, selectedBrand, models, selectedModels) => {
      // console.log('Бренды:',brandOptions);
      // console.log('Выбранные бренды', selectedBrand);
      // console.log('onBrandSelected', models);
      return dispatch(brandSelected(brandOptions, selectedBrand, models, selectedModels));
    }
  };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FormAddProductContainer);