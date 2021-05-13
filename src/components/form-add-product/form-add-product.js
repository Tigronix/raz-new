import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import FilesLoader from '../file-loader';

import { withRazbiratorService } from '../hoc';
import {
  fetchCarBrands,
  brandSelected,
  fetchCarModels,
} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';

import './form-add-product.css';

const FormAddProduct = ({
  brandOptions,
  models,
  onBrandSelected,
  selectedModels,
  filesLoading
}) => {

  return (
    <form className="form-add-product">
      <h1>{filesLoading}</h1>
      <h2>Добавление товара</h2>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <h4>Марки</h4>
            <Select
              placeholder="Марки"
              options={brandOptions}
              onChange={(selectedBrand) => onBrandSelected(brandOptions, selectedBrand, models, selectedModels)}
              name="brands"
              closeMenuOnSelect={false}
              isMulti
              isSearchable
            />
          </div>
          <div className="form-group">
            <h4>Модели</h4>
            <Select
              placeholder="Модели"
              options={selectedModels}
              closeMenuOnSelect={false}
              name="models"
              isMulti
              isSearchable
            />
          </div>
          <div className="form-group">
            <h4>Цена</h4>
            <input name="price" className="form-control" type="text" placeholder="Цена" />
          </div>
          <div className="form-group">
            <h4>ОЕМ</h4>
            <input name="oem" className="form-control" type="text" placeholder="ОЕМ" />
          </div></div>
        <div className="col">
          <FilesLoader></FilesLoader>
        </div>
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
    const {
      brandOptions,
      loading,
      error,
      selectedBrand,
      onBrandSelected,
      models,
      selectedModels,
      onFilesChange,
      files,
      filesLoading
    } = this.props;

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
      onFilesChange={onFilesChange}
      files={files}
      filesLoading={filesLoading}
    ></FormAddProduct>
  }
}

const mapStateToProps = (
  {
    car: { brandOptions, loading, error, selectedBrand, models, selectedModels },
    files: { files }
  }
) => {
  return {
    brandOptions,
    loading,
    error,
    selectedBrand,
    models,
    selectedModels,
    files
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    fetchCarBrands: fetchCarBrands(razbiratorService, dispatch),
    fetchCarModels: fetchCarModels(razbiratorService, dispatch),
    onBrandSelected: (brandOptions, selectedBrand, models, selectedModels) => {
      return dispatch(brandSelected(brandOptions, selectedBrand, models, selectedModels));
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FormAddProductContainer);