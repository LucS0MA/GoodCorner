import { useForm, SubmitHandler } from "react-hook-form";
import { useConfirmPasswordMutation } from "../generated/graphql-types";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [passwordConfirm] = useConfirmPasswordMutation();
  const navigate = useNavigate();
  const { code } = useParams();
  type Inputs = {
    code: string;
    newPassword: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    passwordConfirm({
      variables: { codeByUser: data.code, newPassword: data.newPassword },
      onCompleted: () => {
        navigate("/");
        toast.success("Password successfully changed !");
      },
      onError: () => {
        toast.error("Error");
      },
    });
  };

  return (
    <>
    <h2>Changement de mot de passe</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="formContent">
      <input
        className="invisible"
        defaultValue={code}
        placeholder="code"
        {...register("code", { required: true })}
      />
      {errors.code && <span>This field is required</span>}

      <input type="submit" className="invisible" />
      <input
        className="inputForm"
        defaultValue={"New password"}
        placeholder="New password"
        type="password"
        {...register("newPassword", { required: true })}
      />
      {errors.newPassword && <span>This field is required</span>}

      <input type="submit" />
      </div>
    </form>
    </>
  );
};

export default ChangePassword;
