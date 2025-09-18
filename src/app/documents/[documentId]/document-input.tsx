
import { useState, useRef } from 'react';
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs'
import { useMutation } from 'convex/react';
import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';
import { useStatus } from '@liveblocks/react';
import { LoaderIcon } from 'lucide-react';

interface DocumentInputProps {
  title: string;
  id: Id<"documents">

}
export const DocumentInput = ({title, id} : DocumentInputProps) => {

  const status = useStatus();

  const [value, setValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({ id, title: newValue })
      .then(() => {
        toast.success("Document title updated");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsPending(false);
      });
  });

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast.success("Document title updated");
        setIsEditing(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsPending(false);
      });
  }

  const showLoader = isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected"; 

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form 
            onSubmit={handleSubmit} 
            className='relative w-fit max-w-[50ch]'
        >
          <span className='px-1.5 text-lg whitespace-pre invisible'>
            {value || ""}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onBlur={() => setIsEditing(false)}
            onChange={onChange}
            className="absolute inset-0 text-lg px-1.5 text-black bg-transparent truncate"
          />
        </form>
      ): (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }} 
          className='text-lg px-1.5 cursor-pointer truncate'
        >
          {title}
        </span>
      )}
      {showError && <BsCloudSlash className='size-4 text-red-500' />}
      {!showLoader && !showError && <BsCloudCheck className=' size-4 text-green-500' />}
      {showLoader && <LoaderIcon className='size-4 animate-spin text-muted-foreground' />}
    </div>
  );
};
