import React from 'react';

class RenderSelectedImageFieldComponent extends React.Component {
  //review it later
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      input: { onChange }
    } = this.props;
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      onChange(reader.result);
    };
  }

  render() {
    const {
      input: { value },
      t
    } = this.props;

    return (
      <React.Fragment>
        <div className="fileinput fileinput-new text-center">
          <div className="fileinput-new thumbnail img-raised">
            <img
              src={value || '/static/images/image_placeholder.jpg'}
              alt="..."
              width="auto"
              height="200"
              className="rounded-circle"
            />
          </div>
          <span className="btn btn-primary mb-4 dz-clickable mt-2">
            <label
              htmlFor="file-upload"
              className="custom-file-upload text-white"
            >
              <i className="fa fa-cloud-upload text-white"></i>{' '}
              {t('profile.chooseAvatarBtn')}
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={this.onChange}
              accept="image/*"
            />
          </span>
        </div>

        <style jsx>{`
          input[type='file'] {
            display: none;
          }
          .custom-file-upload {
            display: inline-block;
            cursor: pointer;
          }
          label {
            margin-bottom: 0 !important;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default RenderSelectedImageFieldComponent;
