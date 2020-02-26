export default interface Profile {
    id: string;
    name: string;
    biography: string;
    image: string;
    charges: string[];

    disabled: boolean;

    likes: number;
    dislikes: number;
}