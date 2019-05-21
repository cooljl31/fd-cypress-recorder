import React from "react";
import { FdEventType, FdAttributeValueEvent, FdAttributeExistsEvent } from "../utils/CypressDictionary";
import styled from "styled-components";

export interface Props {
    target: HTMLElement;
    selector: string;
    onMouseDown: (event: FdAttributeValueEvent | FdAttributeExistsEvent) => void;
}

export default function ContextULCheckAttribute(props: Props) {
    function handleAttributeValueEquals(e: React.MouseEvent<HTMLElement>) {
        props.onMouseDown({
            type: FdEventType.ATTRIBUTE_VALUE_EQUALS,
            target: props.selector,
            name: e.currentTarget.getAttribute('data-name') as string,
            value: e.currentTarget.getAttribute('data-value') as string
        });
    }

    function handleAttributeValueContains(e: React.MouseEvent<HTMLElement>) {
        const value = prompt('Attribute value contains');
        if (value) {
            props.onMouseDown({
                type: FdEventType.ATTRIBUTE_VALUE_CONTAINS,
                target: props.selector,
                name: e.currentTarget.getAttribute('data-name') as string,
                value
            });
        }
    }

    function handleAttributeExists(e: React.MouseEvent<HTMLElement>) {
        props.onMouseDown({
            type: FdEventType.ATTRIBUTE_VALUE_EXISTS,
            target: props.selector,
            name: e.currentTarget.getAttribute('data-name') as string
        });
    }

    return (
        <ul>
            {(props.target as HTMLElement).attributes.length === 0 ? <li className="label">No attributes found</li> : <li className="label">Attributes</li>}
            {
                [].slice.call((props.target as HTMLElement).attributes).map((attribute: any) => {
                    if (typeof attribute == 'object') {
                        return (
                            <>
                                <li className="label"><b>{attribute.name}</b></li>
                                <li className="clickable" data-name={attribute.name} data-value={attribute.value} onMouseDown={handleAttributeValueContains}>Contains...</li>
                                <li className="clickable" data-name={attribute.name} data-value={attribute.value} onMouseDown={handleAttributeValueEquals}><StyledDiv>Equals<small>{attribute.value}</small></StyledDiv></li>
                                <li className="clickable" data-name={attribute.name} data-value={attribute.value} onMouseDown={handleAttributeExists}>Exists</li>
                            </>
                        );
                    }
                    return null;
                })
            }
        </ul>
    );
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`;