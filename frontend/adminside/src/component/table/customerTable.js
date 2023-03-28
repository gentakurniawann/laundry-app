import React from 'react'
import Media from '../media'

export default class CustomerTable extends React.Component {
  render() {
    return (
        <tr>
            <td>{this.props.no}</td>
            <td>
                <img alt={this.props.nameimage} src={this.props.image} width="40px" height="40px" style={{borderRadius: '50%'}}/>
            </td>
            <td>{this.props.name}</td>
            <td>{this.props.username}</td>
            <td>{this.props.phone}</td>
            <td>{this.props.address}</td>
            <td style={{minWidth: '118px'}}>
                <button className="btn btn-edit mx-1" onClick={this.props.onEdit}>
                    <Media
                        value
                        image="icon-edit.svg"
                        alt="icon-edit.svg"
                    />
                </button>
                <button className="btn btn-delete mx-1" onClick={this.props.onDelete}>
                    <Media
                        value
                        image="icon-delete.svg"
                        alt="icon-delete.svg"
                    />
                </button>
            </td>
        </tr>
    )
  }
}
