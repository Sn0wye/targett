import React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth, useClerk, useUser } from '@clerk/clerk-expo';
import { FlashList } from '@shopify/flash-list';

import { api, type RouterOutputs } from '~/utils/api';

const PostCard: React.FC<{
  post: RouterOutputs['post']['all'][number];
  onDelete: () => void;
}> = ({ post, onDelete }) => {
  const router = useRouter();

  return (
    <View className='flex flex-row rounded-lg bg-white/10 p-4'>
      <View className='flex-grow'>
        <TouchableOpacity onPress={() => router.push(`/post/${post.id}`)}>
          <Text className='text-xl font-semibold text-pink-400'>
            {post.title}
          </Text>
          <Text className='mt-2 text-white'>{post.content}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text className='font-bold uppercase text-pink-400'>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const CreatePost: React.FC = () => {
  const utils = api.useContext();

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle('');
      setContent('');
      await utils.post.all.invalidate();
    }
  });

  return (
    <View className='mt-4'>
      <TextInput
        className='mb-2 rounded bg-white/10 p-2 text-white'
        placeholderTextColor='rgba(255, 255, 255, 0.5)'
        value={title}
        onChangeText={setTitle}
        placeholder='Title'
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className='mb-2 text-red-500'>
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className='mb-2 rounded bg-white/10 p-2 text-white'
        placeholderTextColor='rgba(255, 255, 255, 0.5)'
        value={content}
        onChangeText={setContent}
        placeholder='Content'
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className='mb-2 text-red-500'>
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <TouchableOpacity
        className='rounded bg-pink-400 p-2'
        onPress={() => {
          mutate({
            title,
            content
          });
        }}
      >
        <Text className='font-semibold text-white'>Publish post</Text>
      </TouchableOpacity>
    </View>
  );
};

const Posts = () => {
  const utils = api.useContext();

  const postQuery = api.post.all.useQuery();

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate()
  });

  return (
    <SafeAreaView className='bg-[#1F104A]'>
      {/* Changes page title visible on the header */}
      <View className='h-full w-full p-4'>
        <Text className='mx-auto pb-2 text-5xl font-bold text-white'>
          Create <Text className='text-pink-400'>T3</Text> Turbo
        </Text>

        <AuthShowcase />

        <Button
          onPress={() => void utils.post.all.invalidate()}
          title='Refresh posts'
          color={'#f472b6'}
        />

        <View className='py-2'>
          <Text className='font-semibold italic text-white'>
            Press on a post
          </Text>
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className='h-2' />}
          renderItem={p => (
            <PostCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        />

        <CreatePost />
      </View>
    </SafeAreaView>
  );
};

const AuthShowcase = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const { data: secretMessage } = api.auth.getSecretMessage.useQuery();

  const { signOut } = useClerk();

  const router = useRouter();

  return (
    <View className='flex flex-col items-center justify-center gap-4'>
      {user && (
        <Text className='text-center text-2xl text-white'>
          <Text>Logged in as {user.fullName}</Text>
          {secretMessage && <Text> - {secretMessage}</Text>}
        </Text>
      )}
      <TouchableOpacity
        className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
        onPress={
          isSignedIn ? () => void signOut() : () => router.push('/login')
        }
      >
        <Text className='text-white'>
          {isSignedIn ? 'Sign out' : 'Sign in'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Posts;