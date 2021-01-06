import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { getPosts } from '../../WebAPI'

const Root = styled.div``
const PostContainer = styled.div`
  margin: 0 auto;
  padding: 16px;
  width: 800px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
`
const PostTitle = styled(Link)`
  font-size: 20px;
  max-width: 360px;
  overflow: hidden;
  cursor: pointer;
  color: #555;
  text-decoration: none;
  word-break: break-word;
`
const PostDate = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
`

const PageControllerContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  & * {
    margin: 0 10px;
  }
`
const PageController = styled.div`
  width: 50px;
  height: 30px;
  color: #555;;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  border: solid 1px #555;
`

const CurrentPage = styled(PageController)`
  border: none;
`

const Loading = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 48px;
  background: rgba(0, 0, 0, 0.5);
`

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  )
}

Post.propTypes = {
  post: PropTypes.object,
}

function HomePage() {
  const [posts, setPosts] = useState([])
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isGettingPosts, setIsGettingPosts] = useState(true)
  const [totalPageCount, setTotalPageCount] = useState(0)

  useEffect(() => {
    getPosts(offset).then((res) => {
      setTotalPageCount(Math.ceil(res.headers.get('X-Total-Count') / 5));
      return res.json()
    }).then((posts) => {
      setPosts(posts);
      setIsGettingPosts(false);
    })
  }, [offset])

  return (
    <Root>
      {isGettingPosts && <Loading>Loading...</Loading>}
      { !isGettingPosts
        && posts
          .map(post => <Post post={post} key={post.id} />)
      }
      {!isGettingPosts
        && (
        <PageControllerContainer>
          <PageController onClick={() => {
            setOffset(0)
            setCurrentPage(1)
          }}
          >
            {"<<"}
          </PageController>
          <PageController onClick={() => {
            if (currentPage <= 1) return
            setOffset(offset - 5)
            setCurrentPage(currentPage - 1)
          }}
          >
            {"<"}
          </PageController>

          <CurrentPage>{`${currentPage} / ${totalPageCount}`}</CurrentPage>

          <PageController onClick={() => {
            if (currentPage >= totalPageCount) return
            setOffset(offset + 5)
            setCurrentPage(currentPage + 1)
          }}
          >
            {">"}
          </PageController>
          <PageController onClick={() => {
            setOffset((totalPageCount - 1) * 5)
            setCurrentPage(totalPageCount)
          }}
          >
            {">>"}
          </PageController>
        </PageControllerContainer>
        )
      }
    </Root>
  );
}

export default HomePage;
