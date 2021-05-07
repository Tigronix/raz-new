import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'

import { withBookstoreService } from '../hoc';
import { fetchCarModels, brandSelected } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';

import './form-add-product.css';

const FormAddProduct = ({ brandOptions, onBrandSelected, selectedBrand }) => {
  return (
    <form>
      <h2>Добавление товара</h2>
      <h2>Selected Brand:
        <div>
          {
            selectedBrand.map((brand) => {
              return (
                <div key={brand.value}>
                  <span>{brand.label}</span>
                </div>
              )
            })
          }
        </div>
      </h2>
      <div className="form-group">
        <h4>Марка</h4>
        <Select
          options={brandOptions}
          onChange={(selectedBrand) => onBrandSelected(brandOptions,selectedBrand)}
          closeMenuOnSelect={false}
          isMulti
          isSearchable
        />
      </div>
      <div className="form-group">
        <h4>Модель</h4>
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
        <input className="form-control-file" type="file" placeholder="Загрузка картинок" />
      </div>
      <button className="btn btn-primary">Добавить товар</button>
    </form>
  )
};

class FormAddProductContainer extends Component {
  componentDidMount() {
    this.props.fetchCarModels();
  }

  render() {
    const { brandOptions, loading, error, selectedBrand, onBrandSelected } = this.props;

    if (loading) {
      return <Spinner></Spinner>;
    }

    if (error) {
      return <ErrorIndicator></ErrorIndicator>
    }

    return <FormAddProduct selectedBrand={selectedBrand} brandOptions={brandOptions} onBrandSelected={onBrandSelected}></FormAddProduct>
  }
}

const mapStateToProps = ({ car: { brandOptions, loading, error, selectedBrand } }) => {
  return { brandOptions, loading, error, selectedBrand };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchCarModels: fetchCarModels(bookstoreService, dispatch),
    onBrandSelected: (brandOptions, selectedBrand) => {
      console.log(brandOptions, selectedBrand);
      return dispatch(brandSelected(brandOptions, selectedBrand));
    }
  };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FormAddProductContainer);