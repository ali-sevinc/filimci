import Button from "../ui/Button";

interface PropsType {
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
}
export default function Confirm({ onCancel, onConfirm, title }: PropsType) {
  return (
    <>
      <div className="absolute left-0 top-0  w-full  bg-slate-900 ">
        <p className="px-4 py-2 text-center text-xl text-slate-200">Confirm</p>
      </div>
      <div className="flex flex-col gap-2 bg-slate-700  px-8 pb-4 pt-14 text-slate-200">
        <h2 className="text-3xl">Are you sure?</h2>
        <p className="text-xl">
          Do you really want to remove{" "}
          <strong className="text-slate-50">
            "{title ? title : "this movie?"}"
          </strong>
        </p>
        <div className="flex justify-end gap-4 pt-8">
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </>
  );
}
