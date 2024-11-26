## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

I'm not familiar with these concepts.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

I don't know what shouldComponentUpdate is. By its name, it seems like a class component lifecycle method.

But I haven't had much experience with class components, only with functional components.

## 3. Describe 3 ways to pass information from a component to its PARENT.

Passing the setState function from a parent component to a child component through props:

```typescript
const Parent = () => {

    const [state, setState] = useState<boolean>(false);

    return (
            <>
                <p>{state}</p>
                <Child setState={setState} />
            </>
           )
};

// Other file
const Child: React.FC<{ setState: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setState,
}) => {
  return <button onClick={() => setState(true)}>change state</button>;
};
```

Calling the context inside the child component and getting the information that was set in the parent component:

```typescript
import React, { useContext } from 'react';
import { context } from './path-to-context';

const Parent = () => {

    const {information} = useContext(context);

    return (
            <>
                <p>{information}</p>
                <Child />
            </>
           )
};

// Other file
import React, { useContext } from 'react';
import { context } from './path-to-context';

const Child = () => {

    const {setInformation} = useContext(context);

  return <button onClick={() => setInformation('information')}>change information</button>;
};
```

Passing a callback function from a parent component to its child component:

```typescript

const Parent = () => {
  const handleInformationFromChild = (information: string) => {
    console.log('Information from child:', information);
  };

  return <Child sendInformation={handleInformationFromChild} />;
};

// Other file
const Child = ({ sendInformation }: { sendInformation: (information: string) => void }) => {
  return (
    <button onClick={() => sendInformation('Hello from Child')}>Send Information</button>
  );
};


```

## 4. Give 2 ways to prevent components from re-rendering.

useMemo and useCallback.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a React feature we use to group elements without adding an extra wrapper node.

It can be represented in two different ways.

```typescript
const Component = () => {
    return (
        <>
          <p>React</p>
          <p>Fragment</p>
        </>)
}
```
and

```typescript
const Component = () => {
    return (
        <React.Fragment>
          <p>React</p>
          <p>Fragment</p>
        </React.Fragment>)
}
```

Using a fragment inside a map without the key prop may cause rendering issues.

```typescript
const Component: React.FC<{array: string[]}> = ({array}) => {
    return (
        <div>
          <h2>React</h2>
          {
            array.map((item) => (
                // Incorrect use of fragment.
                <>
                  <span>text</span>
                  <p>{item}</p>
                </>
            ))
          }
        </div>)
}
```

This is the correct way to use it inside a map.

```typescript
const Component: React.FC<{array: string[]}> = ({array}) => {
    return (
        <div>
          <h2>React</h2>
          {
            array.map((item, index) => (
                // Correct use of fragment.
                <React.Fragment key={index}>
                  <span>text</span>
                  <p>{item}</p>
                </React.Fragment>
            ))
          }
        </div>)
}
```

## 6. Give 3 examples of the HOC pattern.

For now, I only remember withRouter from older versions of react-router-dom.

## 7. What's the difference in handling exceptions in promises, callbacks and async…await?

With promises, we use the `.catch` method to handle exceptions.

I'm not very familiar with handling exceptions in callbacks, but I think we handle errors manually.

With `async...await`, we use `try...catch` to handle exceptions in the `catch` block.

## 8. How many arguments does setState take and why is it async.

The setState function can receive one argument.

```typescript
const Component = () => {
    const [state, setState] = useState('')

    return (<button onClick={() => setState('new state')}>ok</button>);
}
```

I don't know for sure, but I would say it is asynchronous to help with component re-rendering.

## 9. List the steps needed to migrate a Class to Function Component.

1. We declare a function instead of extending a class from React.Component.

2. We replace this.state and this.setState with the useState hook.

3. Replace the lifecycle methods with the useEffect hook.

4. Access props directly in the functional component instead of using this.props.

## 10. List a few ways styles can be used with components.

We can use the style prop, which receives an object with CSS properties in camelCase.

- Example:

```typescript
const Component = () => {
    return (<p style={{ color: "blue", fontSize: "16px" }}>style object</p>)
}
```

We can also use a styling library, like Styled Components.

- Example:

```typescript
import styled from "styled-components";

const Component = () => {
    return (<Text>style component</Text>)
}

const Text = styled.p`
  color: "#000000";
  font-size: 16px;
`;
```

## 11. How to render an HTML string coming from the server.

We can use the `dangerouslySetInnerHTML` prop on an HTML element. This prop expects an object with a key named `__html`, which receives the stringified HTML from the server.

- Example:

```typescript
const Component = () => {
    return (<div dangerouslySetInnerHTML={{__html: "<p>Stringified html received from the server</p>"}} />)
}
```