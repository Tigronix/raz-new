import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import FilesLoader from '../file-loader';
import Dnd from '../dnd';

import { withRazbiratorService } from '../hoc';
import {
  fetchCarBrands,
  brandSelected,
  fetchCarModels,
  insertFormData
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
  selectedModels,
  filesLoading,
  crop,
  cropFile,
  onSubmit,
  selectedBrand,
  realFiles
}) => {

  const renderCrop = () => {
    if (!cropFile) {
      return null;
    }

    return <Crop></Crop>
  };

  return (
    <form className="form-add-product" onSubmit={(e) => onSubmit(e, selectedBrand, selectedModels)}>
      <h1>{filesLoading}</h1>
      <h2>Добавление товара</h2>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <h4>Марки</h4>
            <div className="hidden-field">
              <Select
                placeholder="Марки"
                options={brandOptions}
                onChange={(selectedBrand) => onBrandSelected(brandOptions, selectedBrand, models, selectedModels)}
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
                options={selectedModels}
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
            <input name="price" className="form-control" type="text" placeholder="Цена" />
          </div>
          <div className="form-group">
            <h4>ОЕМ</h4>
            <input name="oem" className="form-control" type="text" placeholder="ОЕМ" required />
          </div>
        </div>
        <div className="col">
          <FilesLoader></FilesLoader>
          <Dnd></Dnd>
          {renderCrop()}
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
      filesLoading,
      crop,
      cropFile,
      onSubmit,
      realFiles
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
      crop={crop}
      cropFile={cropFile}
      onSubmit={onSubmit}
      realFiles={realFiles}
    ></FormAddProduct>
  }
}

const mapStateToProps = (
  {
    car: { brandOptions, loading, error, selectedBrand, models, selectedModels },
    files: { files, realFiles },
    crop: { crop, cropFile }
  }
) => {
  return {
    brandOptions,
    loading,
    error,
    selectedBrand,
    models,
    selectedModels,
    files,
    realFiles,
    crop,
    cropFile
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    fetchCarBrands: fetchCarBrands(razbiratorService, dispatch),
    fetchCarModels: fetchCarModels(razbiratorService, dispatch),
    onBrandSelected: (brandOptions, selectedBrand, models, selectedModels) => {
      return dispatch(brandSelected(brandOptions, selectedBrand, models, selectedModels));
    },
    onSubmit: (e, selectedBrand, selectedModels, realFiles) => {
      e.preventDefault();
      const formData = getFormData(e);

      formData.selectedBrand = selectedBrand;
      formData.selectedModels = selectedModels;
      formData.realFiles = realFiles;
      console.log('onSubmit', formData);

      insertFormData(razbiratorService, dispatch, formData);
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FormAddProductContainer);