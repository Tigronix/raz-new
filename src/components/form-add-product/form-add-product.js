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
  modelsSelected
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
  formData
}) => {

  const renderCrop = () => {
    if (!cropFile) {
      return null;
    }

    return <Crop></Crop>
  };

  const renderRedirect = () => {
    const isSubmitSuccess = formData === 'ok';

    if(isSubmitSuccess){
      return (
        <h1>WOW!</h1>
      )
    }

    return (
      <h1>BAD!</h1>
    )
  };

  return (
    <form className="form-add-product" onSubmit={(e) => onSubmit(e, selectedBrand, selectedModels, realFiles)}>
      {renderRedirect()}
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
                required
              />
              <input type="text" required defaultValue={selectValidation(selectedBrand)} className="hidden-field__field" />
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
                required
              />
              <input type="text" required defaultValue={selectValidation(selectedModels)} className="hidden-field__field" />
            </div>
          </div>
          <div className="form-group">
            <h4>Цена</h4>
            <input required name="price" className="form-control" type="text" placeholder="Цена" />
          </div>
          <div className="form-group">
            <h4>ОЕМ</h4>
            <input required name="oem" className="form-control" type="text" placeholder="ОЕМ" />
          </div>
          <button className="btn btn-primary">Добавить товар</button>
        </div>
        <div className="col">
          <FilesLoader></FilesLoader>
          <Dnd></Dnd>
          {renderCrop()}
        </div>
      </div>
      {/* <Redirect to="/" push /> */}
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
      filteredModels,
      onFilesChange,
      files,
      crop,
      cropFile,
      onSubmit,
      realFiles,
      onModelsSelected,
      selectedModels,
      formData
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
    ></FormAddProduct>
  }
}

const mapStateToProps = (
  {
    car: { brandOptions, loading, error, selectedBrand, models, filteredModels, selectedModels },
    files: { files, realFiles },
    crop: { crop, cropFile },
    formData: { formData }
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
    formData
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
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FormAddProductContainer);