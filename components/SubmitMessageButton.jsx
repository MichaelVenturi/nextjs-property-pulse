import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

// useActionState comes with an isPending value, for if the action is pending.  So I can use that instead of useFormStatus for this use case
const SubmitMessageButton = ({ isPending }) => {
  const { pending } = useFormStatus(); // gonna leave this here, to show it is an option
  return (
    <button
      className={`${
        isPending ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
      } text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center`}
      type="submit"
      disabled={isPending}>
      <FaPaperPlane className="mr-2" /> {isPending ? "Sending..." : "Send Message"}
    </button>
  );
};
export default SubmitMessageButton;
