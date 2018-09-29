import React from 'react'

class FileItem extends React.Component {
  render() {
    const { fileArr } = this.props
    return (
      <React.Fragment>
        {fileArr.map((item, index) => (
          <a
            key={index}
            href={item.url}
          >
            {item.filename}
          </a>
        ))}
      </React.Fragment>
    )
  }
}

export default FileItem
