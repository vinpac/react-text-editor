import autobind from 'autobind-decorator';
import cx from 'classnames';
import React, { PropTypes } from 'react';
import { backgroundImage } from '../../lib/componentUtils';

class ProgressiveImage extends React.Component {
  static propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    containerProps: PropTypes.object,
    height: PropTypes.number,
    images: PropTypes.array.isRequired,
    onLoad: PropTypes.func,
    width: PropTypes.number,
  };

  static defaultProps = {
    role: 'image',
  };

  state = {};

  @autobind
  onLoad() {
    this.setState({
      loaded: true,
    }, this.props.onLoad);
  }

  render() {
    const {
      images,
      containerProps,
      width,
      height,
      ...props
    } = this.props;
    const { loaded } = this.state;
    const aspectRatio = (height / width) * 100;

    return (
      <div
        {...containerProps}
        className={cx({
          'progressive-image': true,
          loaded,
        }, containerProps && containerProps.className)}
        style={{ width }}
      >
        <div
          className="progressive-image-ratio"
          style={aspectRatio && {
            paddingTop: `${aspectRatio}%`,
          }}
        >
          <div
            className={cx({
              'absolute-center': !!aspectRatio,
            })}
          >
            { images.length === 1 &&
              <img
                src={images[0]}
                {...props}
                onLoad={this.onLoad}
                role="presentation"
                className="progressive-image-large"
              />
            }
            { images.length > 1 &&
              <div
                className="progressive-media-cover"
                style={backgroundImage(images[1])}
              />
            }
            {
              images.length > 1 &&
              <img
                src={images[0]}
                {...props}
                onLoad={this.onLoad}
                role="presentation"
                className="progressive-image-large"
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressiveImage;
