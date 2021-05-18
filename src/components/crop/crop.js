import React, { useState, useCallback, useRef, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { withRazbiratorService } from '../hoc';
import {
  updateCropImage
} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Crop = ({
  onCropComplete,
  cropFile
}) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <div className="App">
      <ReactCrop
        src={cropFile.src}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            display: 'none',
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)
          }}
        />
      </div>
      <button
        type="button"
        onClick={useCallback(() => {
          console.log(completedCrop);
          if (completedCrop) {
            onCropComplete(completedCrop)
          }

        }, [completedCrop])}

      >
        Сохранить картинку
      </button>
    </div>
  );
};

class CropContainer extends Component {
  componentDidMount() {

  }

  render() {
    const {
      loading,
      error,
      onCropComplete,
      cropFile
    } = this.props;

    if (loading) {
      return <Spinner></Spinner>;
    }

    if (error) {
      return <ErrorIndicator></ErrorIndicator>
    }

    return (
      <Crop onCropComplete={onCropComplete} cropFile={cropFile}></Crop>
    )
  }
}

const mapStateToProps = (
  {
    crop: {
      loading,
      error,
      crop,
      cropFile
    }
  }
) => {
  return {
    loading,
    error,
    crop,
    cropFile
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    onCropComplete: (crop) => {
      return updateCropImage(razbiratorService, dispatch, crop);
    }
  }
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CropContainer);
