const Confirmation = ({
  onConfirm = null,
  onCloseModal,
  disabled,
  title,
  type,
}) => {
  return (
    <div className="flex gap-4">
      <p className="text-center font-medium">{title}</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={onCloseModal}
          disabled={disabled}
          className="w-[50px] rounded-md border-[1px] border-black transition-all hover:scale-110 hover:bg-red-600 hover:text-white"
        >
          No
        </button>
        <button
          disabled={disabled}
          onClick={onConfirm}
          type={type}
          className="w-[50px] rounded-md border-[1px] border-black bg-black text-white transition-all hover:scale-110"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
