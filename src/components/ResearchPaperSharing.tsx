
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChatBubbleIcon, HeartIcon, BookmarkIcon, PaperPlaneIcon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  author: {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
  };
  category: string;
  publishedDate: Date;
  likes: number;
  comments: number;
  attachmentUrl?: string;
  attachmentName?: string;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

interface ResearchPaperSharingProps {
  currentUser: {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
  };
}

const ResearchPaperSharing: React.FC<ResearchPaperSharingProps> = ({ currentUser }) => {
  const { toast } = useToast();
  const [papers, setPapers] = useState<ResearchPaper[]>([
    {
      id: "paper1",
      title: "Recent Advances in Telemedicine for Rural Healthcare in India",
      abstract: "This paper explores the impact of recent technological advancements in telemedicine on healthcare accessibility in rural India. Using data from a three-year study across 150 villages, we demonstrate significant improvements in patient outcomes and cost-effectiveness.",
      author: {
        id: "author1",
        name: "Dr. Priya Sharma",
        specialty: "Public Health",
        avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=0A84FF&color=fff",
      },
      category: "Public Health",
      publishedDate: new Date(2023, 5, 15),
      likes: 42,
      comments: 7,
      attachmentUrl: "#",
      attachmentName: "telemedicine_rural_india.pdf",
      tags: ["Telemedicine", "Rural Health", "India", "Digital Health"],
      isLiked: true,
      isBookmarked: false
    },
    {
      id: "paper2",
      title: "Comparison of Treatment Outcomes for Diabetic Ketoacidosis Using Different Insulin Protocols",
      abstract: "This retrospective study compares outcomes of three different insulin protocols for treating diabetic ketoacidosis in a tertiary care hospital in Mumbai over a five-year period. Results indicate protocol B showed superior time-to-resolution and fewer hypoglycemic events.",
      author: {
        id: "author2",
        name: "Dr. Rajesh Patel",
        specialty: "Endocrinology",
        avatar: "https://ui-avatars.com/api/?name=Rajesh+Patel&background=30D158&color=fff",
      },
      category: "Endocrinology",
      publishedDate: new Date(2023, 8, 3),
      likes: 28,
      comments: 12,
      attachmentUrl: "#",
      attachmentName: "dka_insulin_protocols.pdf",
      tags: ["Diabetes", "DKA", "Insulin Protocols", "Comparative Study"],
      isLiked: false,
      isBookmarked: true
    },
    {
      id: "paper3",
      title: "Efficacy of Traditional Ayurvedic Treatments in Management of Mild to Moderate Hypertension",
      abstract: "This randomized controlled trial evaluated the efficacy of three traditional Ayurvedic formulations in managing mild to moderate hypertension compared to standard pharmacotherapy. Results show promising blood pressure reductions with Formulation A with minimal side effects.",
      author: {
        id: "author3",
        name: "Dr. Ananya Singh",
        specialty: "Ayurvedic Medicine",
        avatar: "https://ui-avatars.com/api/?name=Ananya+Singh&background=FF9F0A&color=fff",
      },
      category: "Alternative Medicine",
      publishedDate: new Date(2023, 9, 12),
      likes: 36,
      comments: 9,
      attachmentUrl: "#",
      attachmentName: "ayurveda_hypertension.pdf",
      tags: ["Ayurveda", "Hypertension", "Traditional Medicine", "Clinical Trial"],
      isLiked: false,
      isBookmarked: false
    }
  ]);
  
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comment1",
      author: {
        id: "author2",
        name: "Dr. Rajesh Patel",
        specialty: "Endocrinology",
        avatar: "https://ui-avatars.com/api/?name=Rajesh+Patel&background=30D158&color=fff",
      },
      content: "Excellent paper! Have you considered extending this study to include more remote areas with limited internet connectivity?",
      timestamp: new Date(2023, 5, 16),
      likes: 3,
      isLiked: true
    },
    {
      id: "comment2",
      author: {
        id: "author3",
        name: "Dr. Ananya Singh",
        specialty: "Ayurvedic Medicine",
        avatar: "https://ui-avatars.com/api/?name=Ananya+Singh&background=FF9F0A&color=fff",
      },
      content: "I'm implementing similar telemedicine solutions in my practice. Would love to collaborate on future research in this area.",
      timestamp: new Date(2023, 5, 17),
      likes: 2,
      isLiked: false
    }
  ]);

  const [isAddingPaper, setIsAddingPaper] = useState(false);
  const [newPaper, setNewPaper] = useState({
    title: '',
    abstract: '',
    category: '',
    tags: '',
    attachment: null as File | null,
  });
  
  const [commentText, setCommentText] = useState('');
  
  const handlePaperClick = (paper: ResearchPaper) => {
    setSelectedPaper(paper);
  };
  
  const handleLikePaper = (paperId: string) => {
    setPapers(papers.map(paper => {
      if (paper.id === paperId) {
        const newLikeStatus = !paper.isLiked;
        return {
          ...paper,
          isLiked: newLikeStatus,
          likes: newLikeStatus ? paper.likes + 1 : paper.likes - 1
        };
      }
      return paper;
    }));
    
    toast({
      title: "Paper liked",
      description: "Your appreciation has been recorded.",
    });
  };
  
  const handleBookmarkPaper = (paperId: string) => {
    setPapers(papers.map(paper => {
      if (paper.id === paperId) {
        return {
          ...paper,
          isBookmarked: !paper.isBookmarked
        };
      }
      return paper;
    }));
    
    toast({
      title: "Paper bookmarked",
      description: "You can find this paper in your bookmarks.",
    });
  };
  
  const handleSubmitComment = () => {
    if (!commentText.trim() || !selectedPaper) return;
    
    const newComment: Comment = {
      id: `comment${Date.now()}`,
      author: currentUser,
      content: commentText,
      timestamp: new Date(),
      likes: 0,
      isLiked: false
    };
    
    setComments([...comments, newComment]);
    
    // Update comment count for the paper
    setPapers(papers.map(paper => {
      if (paper.id === selectedPaper.id) {
        return {
          ...paper,
          comments: paper.comments + 1
        };
      }
      return paper;
    }));
    
    setCommentText('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
  };
  
  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newLikeStatus = !comment.isLiked;
        return {
          ...comment,
          isLiked: newLikeStatus,
          likes: newLikeStatus ? comment.likes + 1 : comment.likes - 1
        };
      }
      return comment;
    }));
  };
  
  const handleAddPaper = () => {
    const { title, abstract, category, tags } = newPaper;
    
    // Validate form
    if (!title.trim() || !abstract.trim() || !category || !tags.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new paper
    const newPaperObj: ResearchPaper = {
      id: `paper${Date.now()}`,
      title,
      abstract,
      author: currentUser,
      category,
      publishedDate: new Date(),
      likes: 0,
      comments: 0,
      tags: tags.split(',').map(tag => tag.trim()),
      isLiked: false,
      isBookmarked: false
    };
    
    if (newPaper.attachment) {
      newPaperObj.attachmentUrl = "#";
      newPaperObj.attachmentName = newPaper.attachment.name;
    }
    
    setPapers([newPaperObj, ...papers]);
    
    // Reset form
    setNewPaper({
      title: '',
      abstract: '',
      category: '',
      tags: '',
      attachment: null,
    });
    
    setIsAddingPaper(false);
    
    toast({
      title: "Paper published",
      description: "Your research paper has been shared with the medical community.",
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setNewPaper({
        ...newPaper,
        attachment: files[0]
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Medical Research Papers</h2>
        <Button onClick={() => setIsAddingPaper(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Share Research
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((paper) => (
          <Card key={paper.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarImage src={paper.author.avatar} alt={paper.author.name} />
                    <AvatarFallback>{paper.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{paper.author.name}</p>
                    <p className="text-xs text-muted-foreground">{paper.author.specialty}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(paper.publishedDate)}</p>
                  </div>
                </div>
                <Badge variant="outline">{paper.category}</Badge>
              </div>
              <CardTitle className="mt-3 text-lg" onClick={() => handlePaperClick(paper)}>
                {paper.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground line-clamp-3">{paper.abstract}</p>
              {paper.attachmentName && (
                <div className="mt-2 text-sm text-blue-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {paper.attachmentName}
                </div>
              )}
              <div className="flex flex-wrap gap-1 mt-3">
                {paper.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${paper.isLiked ? 'text-red-500' : ''}`}
                  onClick={() => handleLikePaper(paper.id)}
                >
                  <HeartIcon className="h-4 w-4 mr-1" />
                  <span>{paper.likes}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="px-2"
                  onClick={() => handlePaperClick(paper)}
                >
                  <ChatBubbleIcon className="h-4 w-4 mr-1" />
                  <span>{paper.comments}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${paper.isBookmarked ? 'text-blue-500' : ''}`}
                  onClick={() => handleBookmarkPaper(paper.id)}
                >
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Dialog for viewing paper details and comments */}
      {selectedPaper && (
        <Dialog open={!!selectedPaper} onOpenChange={(open) => !open && setSelectedPaper(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{selectedPaper.title}</DialogTitle>
              <DialogDescription>
                Published by {selectedPaper.author.name} on {formatDate(selectedPaper.publishedDate)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Abstract</h4>
                    <p className="text-sm">{selectedPaper.abstract}</p>
                  </div>
                  
                  {selectedPaper.attachmentName && (
                    <div className="mt-2 text-sm text-blue-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <a href="#" className="hover:underline">{selectedPaper.attachmentName}</a>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {selectedPaper.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3">Comments ({comments.length})</h4>
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 pb-3 border-b">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium">{comment.author.name}</p>
                                <p className="text-xs text-muted-foreground">{comment.author.specialty}</p>
                              </div>
                              <p className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</p>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`px-2 mt-1 ${comment.isLiked ? 'text-red-500' : ''}`}
                              onClick={() => handleLikeComment(comment.id)}
                            >
                              <HeartIcon className="h-3 w-3 mr-1" />
                              <span className="text-xs">{comment.likes}</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="pt-4 border-t mt-4">
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      className="min-h-[60px] flex-1"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Button 
                      size="sm" 
                      className="self-end"
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim()}
                    >
                      <PaperPlaneIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Dialog for adding a new paper */}
      <Dialog open={isAddingPaper} onOpenChange={setIsAddingPaper}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Share Research Paper</DialogTitle>
            <DialogDescription>
              Share your research with the medical community. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title" 
                placeholder="Enter research paper title" 
                value={newPaper.title}
                onChange={(e) => setNewPaper({...newPaper, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="abstract">Abstract *</Label>
              <Textarea 
                id="abstract" 
                placeholder="Summarize your research findings" 
                className="min-h-[100px]"
                value={newPaper.abstract}
                onChange={(e) => setNewPaper({...newPaper, abstract: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={newPaper.category} 
                  onValueChange={(value) => setNewPaper({...newPaper, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Oncology">Oncology</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Public Health">Public Health</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                    <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                    <SelectItem value="Alternative Medicine">Alternative Medicine</SelectItem>
                    <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags *</Label>
                <Input 
                  id="tags" 
                  placeholder="comma,separated,tags" 
                  value={newPaper.tags}
                  onChange={(e) => setNewPaper({...newPaper, tags: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment (PDF)</Label>
              <Input 
                id="attachment" 
                type="file" 
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingPaper(false)}>Cancel</Button>
            <Button onClick={handleAddPaper}>Publish Paper</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResearchPaperSharing;
