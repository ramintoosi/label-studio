import React, { useCallback, useContext } from 'react';
import { Button } from '../../components';
import { Form, Input, TextArea } from '../../components/Form';
import { RadioGroup } from '../../components/Form/Elements/RadioGroup/RadioGroup';
import { ProjectContext } from '../../providers/ProjectProvider';
import { Block } from '../../utils/bem';

export const GeneralSettings = () => {
  const {project, fetchProject} = useContext(ProjectContext);

  const updateProject = useCallback(() => {
    if (project.id) fetchProject(project.id, true);
  }, [project]);

  const colors = [
    '#FFFFFF',
    '#F52B4F',
    '#FA8C16',
    '#F6C549',
    '#9ACA4F',
    '#51AAFD',
    '#7F64FF',
    '#D55C9D',
  ];

  const samplings = [
    {value: "Sequential", label: "متوالی", description: "وظایف بر اساس ترتیب تاریخ مدیریت داده مرتب شده است"},
    {value: "Uniform", label: "تصادفی", description: "وظایف با تصادفی یکنواخت انتخاب می‌شوند"},
  ];

  return (
    <div style={{width: 480}}>
      <Form
        action="updateProject"
        formData={{...project}}
        params={{pk: project.id}}
        onSubmit={updateProject}
      >
        <Form.Row columnCount={1} rowGap="32px">
          <Input
            name="title"
            label="نام پروژه"
            labelProps={{large: true}}
          />

          <TextArea
            name="description"
            label="توضیحات"
            labelProps={{large: true}}
            style={{minHeight: 128}}
          />

          <RadioGroup name="color" label="رنگ" size="large" labelProps={{size: "large"}}>
            {colors.map(color => (
              <RadioGroup.Button key={color} value={color}>
                <Block name="color" style={{'--background': color}}/>
              </RadioGroup.Button>
            ))}
          </RadioGroup>

          <RadioGroup label="نمونه کار" labelProps={{size: "large"}} name="sampling" simple>
            {samplings.map(({value, label, description}) => (
              <RadioGroup.Button
                key={value}
                value={`${value} sampling`}
                label={`نمونه برداری ${label}`}
                description={description}
              />
            ))}
          </RadioGroup>
        </Form.Row>

        <Form.Actions>
          <Form.Indicator>
            <span case="success">ذخیره شد!</span>
          </Form.Indicator>
          <Button type="submit" look="primary" style={{width: 120}}>ذخیره</Button>
        </Form.Actions>
      </Form>
    </div>
  );
};

GeneralSettings.menuItem = "عمومی";
GeneralSettings.path = "/";
GeneralSettings.exact = true;
