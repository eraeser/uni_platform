/* eslint-disable react/no-multi-comp */

import React from 'react';
import {
  SectionList,
  View,
  Text,
  Button,
} from 'react-native';

import { connect } from 'react-redux';

import { CommentList } from '../Comment';
import { Page, ButtonRow } from './components';
import Controls from '../utils/Controls';
import MainHeader from '../utils/MainHeader';

import { deleteThreadAsync, voteThreadAsync } from '../../business/threads';

const sections = (renderContent, renderComments) => ([
  {title: 'main', data: ['content'], key: 'main_section', renderItem: renderContent},
  {title: 'buttons', data: ['comments'], key: 'comment_section', renderItem: renderComments},
])

class Thread extends React.Component {
  constructor(props) {
    super(props);
    const thread = props.navigation.getParam('thread', 'NO-ITEM');
    this.state = {
      showButtons: false,
      thread,
    }
  }

  onDelete = () => {
    deleteThreadAsync(this.state.thread.id, this.props.user.auth_token);
    this.props.navigation.goBack();
  }

  onEdit = () => {
    this.props.navigation.navigate(
      'CreateThread',
      {
        action: 'edit',
        thread: this.state.thread,
      },
    );
  }

  onViewableItemsChanged = ({viewableItems, changed}) => {
    let commentsVisible = false;
    let headerVisible = false;
    let commentsWereVisible = false;
    viewableItems.forEach(item => {
      if (item.key === 'comment_section' && item.isViewable) {
        headerVisible = true;
      }
      if (item.key === 'comments0' && item.isViewable) {
        commentsVisible = true;
      }
    });
    changed.forEach(item => {
      if (item.key === 'comments0' && !item.isViewable) {
        commentsWereVisible = true;
      }
    })
    this.computeShowButtons(commentsVisible, headerVisible, commentsWereVisible);
  }

  onComments = () => {
    // console.log('go to comments');
    this._sectionList.scrollToLocation({
      itemIndex: 0,
      sectionIndex: 1,
      viewPosition: 0,
    })
  }

  onVote = () => (action) => async () => {
    const nbs = await voteThreadAsync({action, thread_id: this.state.thread.id}, this.props.user.auth_token)
    const thread = this.state.thread;
    thread.vote_score = nbs
    this.setState(thread)
  }

  computeShowButtons = (commentsVisible, headerVisible, commentsWereVisible) => {
    let show = true;
    if (commentsVisible) {
      show = false;
    }
    if (headerVisible) {
      show = false;
    }
    if (commentsWereVisible) {
      show = true;
    }
    this.setState({showButtons: show});
  }

  keyExtractor = (item, index) => {
    // console.log(item, index);
    return item.key ? item.key : item + index;
  }

  renderDescription = () => (
    this.state.thread.description ? (
      <View style={{marginTop: 2, marginBottom: 2, borderBottomWidth: 0.33, borderColor: 'rgba(0,0,0,0.3)'}}>
        <Text>{this.state.thread.description}</Text>
      </View>
    ) : null
  )

  renderContent = () => (
    <View style={{width: '90%', alignSelf: 'center'}}>
      {this.renderDescription()}
      <Page data={this.state.thread.content} />
    </View>
  )

  renderComments = () => (
    <CommentList navigation={this.props.navigation} thread={this.state.thread} />
  )

  renderSectionHeader = ({section: {title}}) => {
    return (
      title === 'buttons' ? <ButtonRow show votes={this.state.thread.vote_score} onVote={this.onVote()} onComments={this.onComments} /> : null
    );
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        <MainHeader>
          <Controls onDelete={this.onDelete} onEdit={this.onEdit} enable={this.props.user.id === this.state.thread.author}>
            <Text style={{textAlign: 'center'}} numberOfLines={2} ellipsizeMode='tail'>{this.state.thread.name}</Text>
          </Controls>
        </MainHeader>
        <SectionList
          onViewableItemsChanged={this.onViewableItemsChanged}
          sections={sections(this.renderContent, this.renderComments)}
          keyExtractor={this.keyExtractor}
          renderItem={({item, index, section}) => {
            console.log(item, index, section);
          }}
          stickySectionHeadersEnabled
          renderSectionHeader={this.renderSectionHeader}
          ref={(c) => {this._sectionList = c}}
        />
        <View>
          <ButtonRow
            show={this.state.showButtons}
            votes={this.state.thread.vote_score}
            onComments={this.onComments}
            onVote={this.onVote()}
          />
          <Button onPress={() => this.props.navigation.navigate('CreateComment', {'thread': this.state.thread})} title="Comment" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users,
})

export default connect(mapStateToProps)(Thread);
