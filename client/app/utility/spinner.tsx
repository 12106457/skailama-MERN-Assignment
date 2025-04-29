import GridLoader from 'react-spinners/HashLoader';
  

interface SpinnerProps {
    loading: boolean; // Explicitly type `isOpen` as boolean  
}




const Spinner:React.FC<SpinnerProps> = ({ loading })  => {
  return (
    <div className="flex items-center justify-center h-screen">
      <GridLoader color="#386077" loading={loading} size={50} />
    </div>
  );
};

export default Spinner;
