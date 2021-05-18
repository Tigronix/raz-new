import React, { Component, useMemo } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';

import { withRazbiratorService } from '../hoc';
import {
  fetchFiles,
  updateFiles,
  updateRejectedFiles
} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';

import './files-loader.css';
import { formatBytes } from '../../utils';

const FilesLoader = ({
  onFilesChange,
  filesLoading,
  onFilesRejected,
  rejectedFiles
}) => {

  const maxSize = 20000000;
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
    accept: 'image/jpeg, image/png',
    minSize: 0,
    maxSize: maxSize,
    multiple: true,
    onDropAccepted: (acceptedFiles) => onFilesChange(acceptedFiles),
    onDropRejected: (rejectedFiles) => onFilesRejected(rejectedFiles),
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

  const renderErrors = (rejectedFiles) => {
    if (!rejectedFiles) {
      return null;
    }

    const errorItems = rejectedFiles.map(({ file, errors }) => {
      const { size, path } = file;
      const fileSize = formatBytes(size);

      return <li key={path}>
        {path} - {fileSize}
        <ul>
          {errors.map((e) => {
            let messageRu = '';
            const { code, message } = e;
            const isFileLarge = code === 'file-too-large';
            const isFileInvalidType = code === 'file-invalid-type';

            if(isFileLarge){
              const splitMsg = formatBytes(
                message.split('File is larger than')[1].split('bytes')[0]
              );
              messageRu = `Файл больше чем ${splitMsg}`;
            }

            if(isFileInvalidType){
              const splitMsg = message.split('File type must be')[1];
              messageRu = `Недопустимый формат файла. Загрузить можно следующие форматы: ${splitMsg}`;
            }

            return <li key={code}>{messageRu}</li>
          })}
        </ul>
      </li>
    });

    return <ul>{errorItems}</ul>
  };

  return (
    <div className="files-loader">

      <h4>Загрузка картинок</h4>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Перетащите файлы в эту область или просто нажмите</p>
        {renderErrors(rejectedFiles)}
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
      onFilesRejected,
      rejectedFiles
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
      onFilesRejected={onFilesRejected}
      rejectedFiles={rejectedFiles}
    ></FilesLoader>
  }
}

const mapStateToProps = (
  {
    files: {
      files,
      loading,
      error,
      filesLoading,
      rejectedFiles
    }
  }
) => {
  return {
    loading,
    error,
    files,
    filesLoading,
    rejectedFiles
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    fetchFiles: fetchFiles(razbiratorService, dispatch),
    onFilesChange: (files) => {
      return dispatch(updateFiles(razbiratorService, dispatch, files));
    },
    onFilesRejected: (rejectedFiles) => {
      return dispatch(updateRejectedFiles(rejectedFiles))
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FilesLoaderContainer);