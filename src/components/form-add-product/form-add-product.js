import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import FilesLoader from '../file-loader';
import Dnd from '../dnd';
import { Redirect } from 'react-router-dom';

import { withRazbiratorService } from '../hoc';
import {
  fetchCarBrands,
  brandSelected,
  fetchCarModels,
  insertFormData,
  modelsSelected,
  fetchProduct
} from '../../actions';
import {
  compose,
  getFormData,
  selectValidation
} from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';
import Crop from '../crop';

import './form-add-product.css';

const FormAddProduct = ({
  brandOptions,
  models,
  onBrandSelected,
  filteredModels,
  cropFile,
  onSubmit,
  selectedBrand,
  realFiles,
  onModelsSelected,
  selectedModels,
  data,
  product
}) => {

  const renderCrop = () => {
    if (!cropFile) {
      return null;
    }

    return <Crop></Crop>
  };

  return (
    <form className="form-add-product" onSubmit={(e) => onSubmit(e, selectedBrand, selectedModels, realFiles)}>
      <h1>{data}</h1>
      <h2>Добавление товара</h2>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <h4>Марки</h4>
            <div className="hidden-field">
              <Select
                placeholder="Марки"
                options={brandOptions}
                onChange={(selectedBrand) => onBrandSelected(brandOptions, selectedBrand, models, filteredModels, selectedModels)}
                closeMenuOnSelect={false}
                isMulti
                isSearchable
                // value={product.selected}
              />
              <input type="text" defaultValue={selectValidation(selectedBrand)} className="hidden-field__field" />
            </div>
          </div>
          <div className="form-group">
            <h4>Модели</h4>
            <div className="hidden-field">
              <Select
                placeholder="Модели"
                options={filteredModels}
                onChange={(selectedModels) => onModelsSelected(selectedModels)}
                value={selectedModels}
                closeMenuOnSelect={false}
                isMulti
                isSearchable

              />
              <input type="text" defaultValue={selectValidation(selectedModels)} className="hidden-field__field" />
            </div>
          </div>
          <div className="form-group">
            <h4>Цена</h4>
            <input defaultValue={product.price} name="price" className="form-control" type="text" placeholder="Цена" />
          </div>
          <div className="form-group">
            <h4>ОЕМ</h4>
            <input defaultValue={product.oem} name="oem" className="form-control" type="text" placeholder="ОЕМ" />
          </div>
          <button className="btn btn-primary">Добавить товар</button>
        </div>
        <div className="col">
          <FilesLoader></FilesLoader>
          <Dnd></Dnd>
          {renderCrop()}
        </div>
      </div>
    </form>

  )
};

class FormAddProductContainer extends Component {
  componentDidMount() {
    const { fetchCarBrands, fetchCarModels, fetchProduct, data } = this.props;

    fetchCarBrands();
    fetchCarModels();

    if (data) {
      fetchProduct(data);
    }
  }

  render() {
    const {
      brandOptions,
      loading,
      error,
      selectedBrand,
      onBrandSelected,
      models,
      filteredModels,
      onFilesChange,
      files,
      crop,
      cropFile,
      onSubmit,
      realFiles,
      onModelsSelected,
      selectedModels,
      formData,
      data,
      product
    } = this.props;

    const isSuccess = formData === 'ok';

    if (isSuccess) {
      return <Redirect to="/" push></Redirect>
    }

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
      filteredModels={filteredModels}
      onFilesChange={onFilesChange}
      files={files}
      crop={crop}
      cropFile={cropFile}
      onSubmit={onSubmit}
      realFiles={realFiles}
      onModelsSelected={onModelsSelected}
      selectedModels={selectedModels}
      formData={formData}
      data={data}
      product={product}
    ></FormAddProduct>
  }
}

const mapStateToProps = (
  {
    car: { brandOptions, loading, error, selectedBrand, models, filteredModels, selectedModels },
    files: { files, realFiles },
    crop: { crop, cropFile },
    formData: { formData },
    redirect: { data },
    product: { product }
  }
) => {
  return {
    brandOptions,
    loading,
    error,
    selectedBrand,
    models,
    filteredModels,
    files,
    realFiles,
    crop,
    cropFile,
    selectedModels,
    formData,
    data,
    product
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    fetchCarBrands: fetchCarBrands(razbiratorService, dispatch),
    fetchCarModels: fetchCarModels(razbiratorService, dispatch),
    onBrandSelected: (brandOptions, selectedBrand, models, filteredModels, selectedModels) => {
      let selectedBrandsIds = [];
      let newFilteredModels = [];

      selectedBrandsIds = [];
      newFilteredModels = [];

      selectedBrand.map((item) => selectedBrandsIds.push(item.value));

      selectedModels.map((modelItem) => {
        const modelId = modelItem.brandId;

        return selectedBrandsIds.map((brandId) => {
          const isMatch = modelId === brandId;

          if (isMatch) {
            newFilteredModels.push(modelItem);
          }

          return newFilteredModels;
        });
      });

      return dispatch(brandSelected(brandOptions, selectedBrand, models, filteredModels, newFilteredModels));
    },
    onModelsSelected: (selectedModels) => {
      return dispatch(modelsSelected(selectedModels));
    },
    onSubmit: (e, selectedBrand, selectedModels, realFiles) => {
      e.preventDefault();
      const formData = getFormData(e);

      formData.selectedBrand = selectedBrand;
      formData.selectedModels = selectedModels;
      formData.realFiles = realFiles;

      insertFormData(razbiratorService, dispatch, formData);
    },
    fetchProduct: (id) => {
      fetchProduct(razbiratorService, dispatch, id);
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FormAddProductContainer);