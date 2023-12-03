interface Props {
  message: string;
}

const ErrorAlert = ({ message }: Props) => {
  return (
    <p className="bg-red-600 text-center py-2 rounded-lg text-white font-bold my-4">
      {message}
    </p>
  );
};

export default ErrorAlert;
