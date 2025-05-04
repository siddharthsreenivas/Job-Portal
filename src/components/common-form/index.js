import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CommonForm = ({
	action,
	buttonText,
	btnType,
	isBtnDisabled,
	formControls,
	formData,
	setFormData,
	handleFileChange,
}) => {

	const renderInputByComponentType = (control) => {
		let content = null;
		switch (control.componentType) {
			case "input":
				content = (
					<div key={control.id} className=" relative mt-8">
						<Label className='text-base font-semibold mb-2' htmlFor={control.name}>{control.label}</Label>
						<Input
							type="text"
							disabled={control.disabled}
							placeholder={control.placeholder}
							name={control.name}
							id={control.name}
							value={formData[control.name]}
							onChange={(e) =>
								setFormData({ ...formData, [e.target.name]: e.target.value })
							}
							className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-sm md:text-base outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>
				);
				break;

			case "file":
				content = (
					<Label
						key={control.id}
						htmlFor={control.name}
						className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
					>
						<h2>{control.label}</h2>
						<Input type="file" onChange={handleFileChange} id={control.name} />
					</Label>
				);
				break;

			default:
				content = (
					<div key={control.id} className="relative flex items-center mt-8">
						<Label htmlFor={control.name}>{control.label}</Label>
						<Input
							type="text"
							disabled={control.disabled}
							placeholder={control.placeholder}
							name={control.name}
							id={control.name}
							value={formData[control.name]}
							onChange={(e) =>
								setFormData({
									...formData,
									[e.target.name]: e.target.value,
								})
							}
							className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>
				);
				break;
		}
        return content
	};

	return (
		<form action={action}>
			{formControls.map((control) => renderInputByComponentType(control))}
			<div className="mt-6 w-full">
				<Button
					type={btnType || "submit"}
					disabled={isBtnDisabled}
					className="flex h-11 items-center justify-center px-5"
				>
					{buttonText}
				</Button>
			</div>
		</form>
	);
};
export default CommonForm;
