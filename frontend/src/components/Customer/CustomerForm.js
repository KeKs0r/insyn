import React from "react";
import RadioButton from "grommet/components/RadioButton";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Form from 'grommet/components/Form'


export default function CustomerForm({ setCustomerClass, customerClass }) {
    const makeSelect = (cl) => {
        return () => {
            setCustomerClass(cl);
        };
    };

    const check = (cl) => (cl === customerClass);


    return (
        <Form pad="medium">
            <Header justify="between">
                <Title>
                    Customer
                </Title>
            </Header>

                <RadioButton id="A" label="A" name="choice" checked={check("A")}
                             onChange={makeSelect("A")}/>
                <RadioButton id="B" label="B" name="choice" checked={check("B")}
                             onChange={makeSelect("B")}/>
                <RadioButton id="C" label="C" name="choice" checked={check("C")}
                             onChange={makeSelect("C")}/>
        </Form>
    )
}