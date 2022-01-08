import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { Button } from "gpl-tailwind-theme";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import Icon from "@material-tailwind/react/Icon";

const EditProjectForm = (props) => {
  const {
    values: { name, logoURL, address, description, subtasks },
    handleSubmit,
    handleInputChange,
    handleChangeFieldByName,
  } = props;

  const handleTaskOnChange = (e) => {
    const value = e.target.value;
    const idx = e.target.name.split("-")[1];
    let _tempArr = [...subtasks];
    _tempArr[idx] = {
      ..._tempArr[idx],
      updatedAt: `${new Date().toISOString()}`,
      name: value,
    };
    handleChangeFieldByName("subtasks", _tempArr);
  };

  const createNewEmptyTask = () => {
    let _tempArr = [...subtasks];
    _tempArr.push({
      name: "",
      createdAt: `${new Date().toISOString()}`,
      updatedAt: `${new Date().toISOString()}`,
    });
    handleChangeFieldByName("subtasks", _tempArr);
  };

  const handleDeleteTask = (idx) => {
    let _tempArr = [...subtasks];
    _tempArr.splice(idx, 1);
    handleChangeFieldByName("subtasks", _tempArr);
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader color="lightBlue" contentPosition="none">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">Project {name}</h2>
            <Button type="submit" color="lightBlue" ripple="dark">
              Update
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <h6 className="text-green-500 text-sm mt-3 mb-6 font-light uppercase">
            Project Information
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full pr-4 mb-10 font-light">
              <Input
                type="text"
                color="purple"
                placeholder="Name"
                value={name}
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full pr-4 mb-10 font-light">
              <Input
                type="text"
                color="purple"
                placeholder="Logo URL"
                value={logoURL}
                name="logoURL"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-12/12 mb-10 font-light">
              <Input
                type="text"
                color="purple"
                placeholder="Address"
                value={address}
                name="address"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-10 font-light">
            <Textarea
              color="purple"
              placeholder="About Me"
              value={description}
              name="description"
              onChange={handleInputChange}
            />
          </div>
          <h6 className="mt-8 text-green-500 text-sm mt-3 mb-6 font-light uppercase flex items-center">
            Subtask Management
            <Button
              color="blue"
              size="sm"
              ripple="light"
              rounded={true}
              iconOnly={true}
              className="ml-4"
              onClick={() => createNewEmptyTask()}
            >
              <Icon name="add" />
            </Button>
          </h6>
          <div className="flex flex-wrap">
            {subtasks.map(({ name }, index) => (
              <div
                key={index}
                className="w-full lg:w-12/12 mb-10 font-light flex justify-between items-center"
              >
                <Input
                  type="text"
                  color="purple"
                  placeholder="Create new task"
                  value={name}
                  name={`task-${index}`}
                  onChange={handleTaskOnChange}
                />
                <Button
                  size="sm"
                  color="red"
                  ripple="light"
                  rounded={true}
                  iconOnly={true}
                  onClick={() => handleDeleteTask(index)}
                >
                  <Icon name="delete" />
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </form>
    </Card>
  );
};

EditProjectForm.defaultProps = {
  values: {
    id: "",
    logoURL: "",
    name: "",
    description: "",
    manager: "",
    address: "",
    subtasks: [],
  },
  handleSubmit: () => undefined,
  handleInputChange: () => undefined,
  handleChangeFieldByName: () => undefined,
};

export default EditProjectForm;
