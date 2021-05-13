import React, { Component, useMemo } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';

import { withRazbiratorService } from '../hoc';
import {
  fetchFiles,
  updateFiles
} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';
import './files-loader.css';

const FilesLoader = ({
  onFilesChange,
  files,
  renderFiles,
  filesLoading
}) => {

  const maxSize = 20242880;
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out, background .24s ease-in-out'
  };

  const activeStyle = {
    borderColor: '#2196f3'
  };

  const acceptStyle = {
    borderColor: '#00e676'
  };

  const rejectStyle = {
    borderColor: '#ff1744'
  };

  const disabledStyle = {
    background: '#ccc'
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/png",
    minSize: 0,
    maxSize: maxSize,
    multiple: true,
    onDropAccepted: (acceptedFiles) => onFilesChange(acceptedFiles),
    disabled: filesLoading
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept,
  ]);

  return (
    <div className="files-loader">

      <h4>Загрузка картинок</h4>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Перетащите файлы в эту область или просто нажмите</p>
      </div>
      {renderFiles(files, filesLoading)}
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

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    fetchFiles: fetchFiles(razbiratorService, dispatch),
    onFilesChange: (files) => {
      return dispatch(updateFiles(razbiratorService, dispatch, files));
    },
    renderFiles: (files, filesLoading) => {
      if (filesLoading) {
        return <Spinner></Spinner>
      }

      return (
        <ul className="files-loader__list">
          {files.map((file) => {
            if (file.id) {
              const { id, src } = file;

              return (
                <li className="files-loader__li" key={id}>
                  <h4>{file.name}</h4>
                  <div className="files-loader__img-box">
                    <img className="files-loader__img" src={src} alt="" />
                  </div>
                </li>
              )
            }

            return '';
          })}
        </ul>
      )
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FilesLoaderContainer);