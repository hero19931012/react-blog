import { useState } from 'react'
import styled from 'styled-components'

import { useHistory } from "react-router-dom";

import { addPost } from '../../WebAPI';

const Root = styled.div``
const NewPostContainer = styled.div`
  width: 600px;
  margin: 20px auto 0 auto;
  padding: 20px;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
`

const PageTitle = styled.div`
  padding: 20px 0;
  font-size: 36px;
  color: #333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`
const InputTitle = styled.div`
  margin-bottom: 5px;
`
const NewPostForm = styled.form`
  padding: 20px 0;
`

const NewPostTitle = styled.input`
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
`

const NewPostContent = styled.textarea`
  margin-bottom: 10px;
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  resize: vertical;
`

const ErrorMessage = styled.div`
  margin-bottom: 5px;
  font-size: 16px;
  color: red;
`

const NewPostSubmitButtonContainer = styled.div`
  text-align: right;
`
const NewPostSubmitButton = styled.button``

function NewPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleNewPostSubmit(e) {
    e.preventDefault();
    addPost(title, content).then((response) => {
      if (response.ok === 0) {
        return setErrorMessage(response.message)
      }
      history.push('/')
    })
  }

  return (
    <Root>
      <NewPostContainer>
        <PageTitle>發布文章</PageTitle>
        <NewPostForm onSubmit={handleNewPostSubmit}>
          <InputTitle>文章標題：</InputTitle>
          <NewPostTitle value={title} onChange={handleTitleChange} />
          <InputTitle>文章內容：</InputTitle>
          <NewPostContent value={content} onChange={handleContentChange} />
          <NewPostSubmitButtonContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <NewPostSubmitButton>發布</NewPostSubmitButton>
          </NewPostSubmitButtonContainer>
        </NewPostForm>
      </NewPostContainer>
    </Root>
  );
}

export default NewPostPage;
