import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { getPost } from '../../WebAPI';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from 'react-syntax-highlighter/dist/esm/styles/prism'


const Root = styled.div``
const PostContainer = styled.div`
  width: 800px;
  margin: 20px auto 0 auto;
  padding: 20px;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
`
const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px 0;
`

const PostTitle = styled.div`
  font-size: 36px;
  color: #555;
`

const PostInfoContainer = styled.div`
  display: flex;
  align-items: center;
`
const PostAuthor = styled.div`
  margin: 10px 10px 0 0;
  font-size: 16px;
  color: #aaa;
`

const PostTime = styled(PostAuthor)``
const PostContent = styled.div`
  padding: 20px 0;
  color: #555;
  white-space: pre-wrap;
`

const Img = styled.img`
  width: 100%;
`

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={cb} language={"javascript"} children={value} />
  },
  image: ({alt, src, title}) => {
    return <Img src={src}/>
  }
}

function PostPage() {
  const [post, setPost] = useState({})
  const [author, setAuthor] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then((post) => {
      setPost(post);
      setAuthor(post.user.nickname);
    })
  }, [])

  return (
    <Root>
      <PostContainer>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostInfoContainer>
            {author && <PostAuthor>{`作者：${author}`}</PostAuthor>}
            <PostTime>{post.createdAt && new Date(post.createdAt).toLocaleString()}</PostTime>
          </PostInfoContainer>
        </PostHeader>
        <PostContent>
          <ReactMarkdown source={post.body} renderers={renderers} />
        </PostContent>
      </PostContainer>
    </Root>
  );
}

export default PostPage;
