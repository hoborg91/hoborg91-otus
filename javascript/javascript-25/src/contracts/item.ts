export interface IItem {
    caption: string;
    description: string;
    done: boolean;
}

export const items: IItem[] = [
    { 
        caption: 'Initialize NPM', 
        description: `Run the folowing command:
        npm init -y`, 
        done: true, },
    { 
        caption: 'Install webpack, Babel and React', 
        description: `Run the following command:
        npm i --save-dev webpack babel-loader react react-dom`, 
        done: true, },
    { 
        caption: 'Set up webpack', 
        description: `Create webpack.config.js file. 
        Add necessary content according to the official documentation.`, 
        done: false, },
    { 
        caption: 'Write code', 
        description: `Write some React components.`, 
        done: false, 
    },
    { 
        caption: 'Build application', 
        description: `Run the following command:
        npm run build`, 
        done: false, },
];