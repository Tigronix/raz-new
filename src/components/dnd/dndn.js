import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRazbiratorService } from '../hoc';
import {
  fetchFiles,
  updateFiles
} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';

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