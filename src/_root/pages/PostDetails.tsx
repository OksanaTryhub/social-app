import { Link, useParams } from 'react-router-dom'

import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import Loader from '@/components/shared/Loader';
import { formatDate } from '@/lib/utils';
import { useUserContext } from '@/context/AuthContext';


const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();

  return (
    <div className='post_details-container'>
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post image" className='post_details-img'/>
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link to={`/profile/${post?.creator.$id}`} className='flex item-xenter gap-3'>
                <img
                  src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                  alt="creator"
                  className='rounded-full w-12 lg:h-12'
                />
                <div className="flex flex-col">
                  <p className='base-medium lg:body-bold text-light-1'>
                    {post?.creator.name}
                  </p>
                  <div className='flex-center gap-2 text-light-3'>
                    <p className='subtle-semibold lg:small-gerular'>
                      {formatDate(post?.$createdAt)}
                    </p>
                    -
                    <p className='subtle-semibold lg:small-gerular'>
                      {post?.location}
                    </p>
                  </div>
                </div> 
              </Link>
              <div className="flex-center gap-4">
                <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails