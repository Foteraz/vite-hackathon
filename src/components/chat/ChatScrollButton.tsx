import { FC } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface ChatScrollButtonsProps {
  isAtTop: boolean;
  isAtBottom: boolean;
  isOverflowing: boolean;
  scrollToTop: () => void;
  scrollToBottom: () => void;
}

export const ChatScrollButtons: FC<ChatScrollButtonsProps> = ({
  isAtTop,
  isAtBottom,
  isOverflowing,
  scrollToTop,
  scrollToBottom
}) => {
  return (
    <>
      {!isAtTop && isOverflowing && (
        <ArrowUpIcon
          className="cursor-pointer opacity-50 hover:opacity-100"
          width={64}
          height={64}
          onClick={scrollToTop}
        />
      )}

      {!isAtBottom && isOverflowing && (
        <ArrowDownIcon
          className="cursor-pointer opacity-50 hover:opacity-100"
          width={64}
          height={64}
          onClick={scrollToBottom}
        />
      )}
    </>
  );
};
