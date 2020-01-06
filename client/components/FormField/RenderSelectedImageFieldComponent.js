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
      input: { value }
    } = this.props;

    return (
      <React.Fragment>
        {/* <div className="fileinput fileinput-new text-center">
          <div className="fileinput-new thumbnail img-raised">
            <img
              src={value || '/static/assets/img/image_placeholder.jpg'}
              alt="..."
            />
          </div>
          <span className="btn btn-raised btn-round btn-default btn-file">
            <span className="fileinput-new">Select image</span>

            <input type="file" onChange={this.onChange} />
          </span>
        </div> */}

        <div
          className="fileinput fileinput-new text-center"
          data-provides="fileinput"
        >
          <div className="fileinput-new thumbnail">
            <img
              src={value || '/static/assets/img/image_placeholder.jpg'}
              alt="..."
            />
          </div>
          <div className="fileinput-preview fileinput-exists thumbnail"></div>
          <div>
            <span className="btn btn-rose btn-round btn-file">
              <span className="fileinput-new">Select image</span>
              <span className="fileinput-exists">Change</span>
              <input type="file" onChange={this.onChange} />
            </span>
          </div>
        </div>

        {/* <div className="picture-container">
          <div className="picture">
            <img
              src={value || '/static/assets/img/placeholder.jpg'}
              className="picture-src"
              alt="img-preview"
            />
            <input type="file" onChange={this.onChange} />
          </div>
          <h6>Image description</h6>
        </div> */}
      </React.Fragment>
    );
  }
}

export default RenderSelectedImageFieldComponent;
