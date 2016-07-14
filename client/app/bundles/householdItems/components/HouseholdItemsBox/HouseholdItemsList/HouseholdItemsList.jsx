import React, { PropTypes }    from 'react';
import Immutable               from 'immutable';
import Alert                   from 'react-bootstrap/lib/Alert';
import Row                     from 'react-bootstrap/lib/Row';
import Col                     from 'react-bootstrap/lib/Col';
import ListGroup               from 'react-bootstrap/lib/ListGroup';
import ListGroupItem           from 'react-bootstrap/lib/ListGroupItem';

import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import _                       from 'lodash';

import HouseholdItem from './HouseholdItem/HouseholdItem';

import BaseComponent from 'libs/components/BaseComponent';

export default class HouseholdItemsList extends BaseComponent {
  static propTypes = {
    $$items: PropTypes.instanceOf(Immutable.List).isRequired,
    error:   PropTypes.any,
    cssTransitionGroupClassNames: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
    _.bindAll(this, '_errorWarning');
  }

  _errorWarning() {
    // If there is no error, there is nothing to add to the DOM
    if (!this.props.error) return null;
    return (
      <Alert bsStyle="danger" key="commentFetchError">
        <strong>HouseholdItems could not be retrieved. </strong>
        A server error prevented loading comments. Please try again.
      </Alert>
    );
  }

  render() {
    const { $$items, cssTransitionGroupClassNames } = this.props;
    
    const itemNodes = $$items.map( $$item =>
      <ListGroupItem>
        <Row>
          <Col sm={4}>{$$item.get('name')}</Col>
          <Col sm={1}>{$$item.get('volume')}</Col>
          <Col sm={1}>{$$item.get('quantity')}</Col>
          <Col sm={2}>{$$item.get('tag')}</Col>
          <Col sm={4}>{$$item.get('description')}</Col>
        </Row>
      </ListGroupItem>
    );

    return (
      <ListGroup>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this._errorWarning()}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          className="householdItemsList"
          component="div"
        >
          {itemNodes}
        </ReactCSSTransitionGroup>
      </ListGroup>
    );
  }
}
