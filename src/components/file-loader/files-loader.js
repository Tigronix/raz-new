import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

import { withBookstoreService } from '../hoc';
import {
  fetchFiles,
  updateFiles
} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';

const FilesLoader = ({
  onFilesChange,
  files,
  renderFiles,
  filesLoading
}) => {

  const maxSize = 20242880;

  return (
    <div className="form-group">

      <h4>Загрузка картинок</h4>
      <Dropzone
        accept="image/png"
        minSize={0}
        maxSize={maxSize}
        multiple
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
      <h2>Files:
          {renderFiles(files, filesLoading)}
      </h2>


      <div className="text-center mt-5">
        {/* <Dropzone
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
    </div>
  )
};

class FilesLoaderContainer extends Component {
  componentDidMount() {
    this.props.fetchFiles();
  }

  render() {
    const {
      loading,
      error,
      onFilesChange,
      files,
      filesLoading,
      renderFiles
    } = this.props;

    if (loading) {
      return <Spinner></Spinner>;
    }

    if (error) {
      return <ErrorIndicator></ErrorIndicator>
    }

    return <FilesLoader
      onFilesChange={onFilesChange}
      files={files}
      filesLoading={filesLoading}
      filesLoading={filesLoading}
      renderFiles={renderFiles}
    ></FilesLoader>
  }
}

const mapStateToProps = (
  {
    files: { files, loading, error, filesLoading }
  }
) => {
  return {
    loading,
    error,
    files,
    filesLoading
  };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchFiles: fetchFiles(bookstoreService, dispatch),
    onFilesChange: (files) => {
      return dispatch(updateFiles(bookstoreService, dispatch, files));
    },
    renderFiles: (files, filesLoading) => {
      if (filesLoading) {
        return <Spinner></Spinner>
      }
      
      return (
        <ul className="form-add-product__list">
          {files.map((file) => {
            if (file.id) {
              const { id, src } = file;

              return (
                <li className="form-add-product__li" key={id}>
                  <h4>{file.name}</h4>
                  <div className="form-add-product__img-box">
                    <img className="form-add-product__img" src={src} alt="" />
                  </div>
                </li>
              )
            }
          })}
        </ul>
      )
    }
  };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FilesLoaderContainer);