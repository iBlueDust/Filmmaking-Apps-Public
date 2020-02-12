export default interface Profile {
    id: string;
    name: string;
    biography: string;
    image: string;
    charges: string[];

    likes: number;
    dislikes: number;
}