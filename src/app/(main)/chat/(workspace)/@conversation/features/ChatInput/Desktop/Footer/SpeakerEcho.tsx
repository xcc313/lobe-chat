import { Button } from 'antd';
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { Volume2, VolumeOff } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';

const SpeakerEcho = memo(() => {
  const theme = useTheme();
  const [isSpeaker, setIsSpeaker] = useState<boolean>(false);
  const lastMessage = useChatStore(chatSelectors.latestMessage, isEqual);
  const [isAIGenerating] = useChatStore((s) => [chatSelectors.isAIGenerating(s)]);

  useEffect(() => {
    if (lastMessage && lastMessage.role === 'assistant' && !isAIGenerating) {
      console.log('TTS begin');
      console.log(lastMessage);
    }
  }, [lastMessage]);

  return (
    <Flexbox
      gap={2}
      horizontal
      style={{ color: theme.colorTextDescription, fontSize: 12, marginRight: 8 }}
    >
      <Button
        icon={isSpeaker ? <Volume2 /> : <VolumeOff />}
        onClick={() => setIsSpeaker(!isSpeaker)}
        title="on/off speaker"
      />
    </Flexbox>
  );
});

export default SpeakerEcho;
