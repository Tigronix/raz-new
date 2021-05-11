import React, { Component, useMemo } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Dropzone from 'react-dropzone';

import { withBookstoreService } from '../hoc';
import {
  fetchCarBrands,
  brandSelected,
  fetchCarModels,
  getFiles,
  fetchFiles
} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';

import './form-add-product.css';

const FormAddProduct = ({
  brandOptions,
  models,
  onBrandSelected,
  selectedBrand,
  selectedModels,
  onFilesChange,
  files
}) => {
  // console.log(files);

  const maxSize = 5242880;

  return (
    <form className="form-add-product">
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
          name="brands"
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
      </div>
      <div className="form-group">
        <h4>Загрузка картинок</h4>
        <Dropzone 
        onDrop={(acceptedFiles) => onFilesChange(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <div className="text-center mt-5">
          {/* <Dropzone
            onDrop={(acceptedFiles) => {
              console.log(acceptedFiles)
            }}
            accept="image/png"
            minSize={0}
            maxSize={maxSize}
            multiple
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragReject,

            }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!isDragActive && 'Click here or drop a file to upload!'}
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}
                  {isDragReject && "File type not accepted, sorry!"}
                </div>
              )
            }
            }
          </Dropzone> */}
        </div>
        <h2>Files:
        <span>
            {
              files.map((file) => {
                return (
                  <div key={file.path}>
                    <div>{file.path}</div>
                    <div>{file.size}</div>
                  </div>
                )
              })
            }
          </span>
        </h2>
      </div>
      <button className="btn btn-primary">Добавить товар</button>
    </form>
  )
};

class FormAddProductContainer extends Component {
  componentDidMount() {
    this.props.fetchFiles();
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
      files
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

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchCarBrands: fetchCarBrands(bookstoreService, dispatch),
    fetchCarModels: fetchCarModels(bookstoreService, dispatch),
    fetchFiles: fetchFiles(bookstoreService, dispatch),
    onBrandSelected: (brandOptions, selectedBrand, models, selectedModels) => {
      return dispatch(brandSelected(brandOptions, selectedBrand, models, selectedModels));
    },
    onFilesChange: (files) => {
      const newFiles = bookstoreService.getFiles(files);
      // console.log('onFilesChange', newFiles);
      return dispatch(getFiles(files))
    }
  };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FormAddProductContainer);