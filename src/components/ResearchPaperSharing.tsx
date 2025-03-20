import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Bookmark, Share2, ThumbsUp, Download, BookOpen, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ResearchPaper {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    affiliation: string;
    avatar: string;
  };
  specialty: string;
  abstract: string;
  methodology?: string;
  results?: string;
  conclusion?: string;
  references?: string[];
  likes: number;
  comments?: {
    author: string;
    date: string;
    content: string;
  }[];
  tags: string[];
}

const researchPapers: ResearchPaper[] = [
  {
    id: 'paper1',
    title: 'Novel Treatment for Heart Failure',
    author: {
      id: 'doctor_1',
      name: 'Dr. Sarah Chen',
      affiliation: 'Massachusetts General Hospital',
      avatar: '/avatars/doctor.jpg',
    },
    specialty: 'Cardiology',
    abstract: 'A groundbreaking study on a new drug for heart failure patients, showing significant improvement in cardiac function and quality of life.',
    methodology: 'Randomized, double-blind, placebo-controlled trial with 500 patients over 2 years.',
    results: 'Significant improvement in ejection fraction and reduction in hospitalizations.',
    conclusion: 'The new drug is a promising treatment option for heart failure.',
    references: ['Smith et al. (2020)', 'Jones et al. (2018)'],
    likes: 42,
    comments: [
      {
        author: 'Dr. John Doe',
        date: '2 days ago',
        content: 'Impressive results! I look forward to seeing this treatment become more widely available.'
      },
      {
        author: 'Dr. Alice Smith',
        date: '1 day ago',
        content: 'What were the side effects observed in the trial?'
      }
    ],
    tags: ['cardiology', 'heart failure', 'treatment']
  },
  {
    id: 'paper2',
    title: 'Advancements in Pediatric Oncology',
    author: {
      id: 'doctor_2',
      name: 'Dr. Michael Brown',
      affiliation: 'St. Jude Children\'s Research Hospital',
      avatar: '/avatars/doctor-2.jpg',
    },
    specialty: 'Oncology',
    abstract: 'An overview of the latest advancements in pediatric oncology, including targeted therapies and immunotherapies.',
    methodology: 'Literature review and meta-analysis of recent clinical trials.',
    results: 'Improved survival rates and reduced long-term side effects in pediatric cancer patients.',
    conclusion: 'Targeted therapies and immunotherapies are revolutionizing pediatric oncology.',
    references: ['Brown et al. (2021)', 'Davis et al. (2019)'],
    likes: 31,
    comments: [
      {
        author: 'Dr. Emily White',
        date: '3 days ago',
        content: 'Excellent summary of the current state of pediatric oncology. Thank you for sharing!'
      }
    ],
    tags: ['oncology', 'pediatric', 'cancer']
  },
  {
    id: 'paper3',
    title: 'The Role of Gut Microbiome in Mental Health',
    author: {
      id: 'doctor_3',
      name: 'Dr. Priya Sharma',
      affiliation: 'National Institute of Mental Health',
      avatar: '/avatars/doctor-3.jpg',
    },
    specialty: 'Psychiatry',
    abstract: 'A comprehensive review of the emerging evidence linking the gut microbiome to mental health disorders such as depression and anxiety.',
    methodology: 'Systematic review of observational studies and clinical trials.',
    results: 'Dysbiosis of the gut microbiome is associated with increased risk of mental health disorders.',
    conclusion: 'Modulating the gut microbiome may be a novel therapeutic strategy for mental health.',
    references: ['Sharma et al. (2022)', 'Garcia et al. (2020)'],
    likes: 55,
    comments: [
      {
        author: 'Dr. David Lee',
        date: '4 days ago',
        content: 'Fascinating research! I wonder if probiotics could be used to improve mental health.'
      },
      {
        author: 'Dr. Karen Green',
        date: '2 days ago',
        content: 'What are the potential risks of manipulating the gut microbiome?'
      }
    ],
    tags: ['psychiatry', 'mental health', 'microbiome']
  },
  {
    id: 'paper4',
    title: 'Artificial Intelligence in Radiology',
    author: {
      id: 'doctor_4',
      name: 'Dr. Robert Johnson',
      affiliation: 'Stanford University Medical Center',
      avatar: '/avatars/doctor-4.jpg',
    },
    specialty: 'Radiology',
    abstract: 'A discussion of the applications of artificial intelligence in radiology, including image analysis, diagnosis, and treatment planning.',
    methodology: 'Review of AI algorithms and their performance in radiological tasks.',
    results: 'AI algorithms can improve the accuracy and efficiency of radiological diagnosis.',
    conclusion: 'Artificial intelligence has the potential to transform radiology practice.',
    references: ['Johnson et al. (2023)', 'Williams et al. (2021)'],
    likes: 68,
    comments: [
      {
        author: 'Dr. Lisa Martinez',
        date: '5 days ago',
        content: 'How will AI impact the role of radiologists in the future?'
      },
      {
        author: 'Dr. Thomas Clark',
        date: '3 days ago',
        content: 'What are the ethical considerations of using AI in radiology?'
      }
    ],
    tags: ['radiology', 'artificial intelligence', 'ai']
  },
  {
    id: 'paper5',
    title: 'Telemedicine for Rural Healthcare',
    author: {
      id: 'doctor_5',
      name: 'Dr. Maria Rodriguez',
      affiliation: 'University of California, San Francisco',
      avatar: '/avatars/doctor-5.jpg',
    },
    specialty: 'General Practice',
    abstract: 'An evaluation of the effectiveness of telemedicine in improving access to healthcare for rural populations.',
    methodology: 'Comparative study of telemedicine vs. traditional healthcare delivery in rural areas.',
    results: 'Telemedicine can improve access to care, reduce healthcare costs, and improve patient outcomes in rural areas.',
    conclusion: 'Telemedicine is a valuable tool for addressing healthcare disparities in rural communities.',
    references: ['Rodriguez et al. (2024)', 'Hernandez et al. (2022)'],
    likes: 72,
    comments: [
      {
        author: 'Dr. Kevin Anderson',
        date: '6 days ago',
        content: 'What are the challenges of implementing telemedicine in rural areas?'
      },
      {
        author: 'Dr. Susan Taylor',
        date: '4 days ago',
        content: 'How can we ensure that telemedicine is accessible to all rural residents, regardless of income or education?'
      }
    ],
    tags: ['general practice', 'telemedicine', 'rural healthcare']
  }
];

const ResearchPaperSharing: React.FC<{
  currentUser: {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
  }
}> = ({ currentUser }) => {
  const { toast } = useToast();
  const [researchPapersState, setResearchPapersState] = useState(researchPapers);
  const [savedPapers, setSavedPapers] = useState<string[]>([]);
  const [likedPapers, setLikedPapers] = useState<string[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [showNewPaperDialog, setShowNewPaperDialog] = useState(false);
  const [newPaperTitle, setNewPaperTitle] = useState('');
  const [newPaperAbstract, setNewPaperAbstract] = useState('');
  const [newPaperTags, setNewPaperTags] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentingPaperId, setCommentingPaperId] = useState<string | null>(null);
  
  const handleSavePaper = (paperId: string) => {
    if (savedPapers.includes(paperId)) {
      setSavedPapers(savedPapers.filter(id => id !== paperId));
      toast({
        title: "Paper unsaved",
        description: "This paper has been removed from your saved list.",
      });
    } else {
      setSavedPapers([...savedPapers, paperId]);
      toast({
        title: "Paper saved",
        description: "This paper has been saved to your list.",
      });
    }
  };
  
  const handleLikePaper = (paperId: string) => {
    if (likedPapers.includes(paperId)) {
      setLikedPapers(likedPapers.filter(id => id !== paperId));
      setResearchPapersState(prevPapers =>
        prevPapers.map(paper =>
          paper.id === paperId ? { ...paper, likes: paper.likes > 0 ? paper.likes - 1 : 0 } : paper
        )
      );
    } else {
      setLikedPapers([...likedPapers, paperId]);
      setResearchPapersState(prevPapers =>
        prevPapers.map(paper =>
          paper.id === paperId ? { ...paper, likes: paper.likes + 1 } : paper
        )
      );
    }
  };
  
  const handleOpenComments = (paperId: string) => {
    setCommentingPaperId(paperId);
  };
  
  const handleAddComment = (paperId: string) => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      author: currentUser.name,
      date: 'Just now',
      content: newComment.trim()
    };
    
    setResearchPapersState(prevPapers =>
      prevPapers.map(paper =>
        paper.id === paperId
          ? { ...paper, comments: [...(paper.comments || []), newCommentObj] }
          : paper
      )
    );
    
    setNewComment('');
    toast({
      title: "Comment added",
      description: "Your comment has been added to the paper.",
    });
  };
  
  const handleViewPaper = (paper: ResearchPaper) => {
    setSelectedPaper(paper);
  };
  
  const handleSharePaper = () => {
    if (!newPaperTitle || !newPaperAbstract) {
      toast({
        title: "Error",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const newPaper: ResearchPaper = {
      id: Date.now().toString(),
      title: newPaperTitle,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        affiliation: currentUser.specialty,
        avatar: currentUser.avatar,
      },
      specialty: currentUser.specialty,
      abstract: newPaperAbstract,
      likes: 0,
      comments: [],
      tags: newPaperTags.split(',').map(tag => tag.trim()),
    };
    
    setResearchPapersState([newPaper, ...researchPapersState]);
    setShowNewPaperDialog(false);
    setNewPaperTitle('');
    setNewPaperAbstract('');
    setNewPaperTags('');
    
    toast({
      title: "Paper shared",
      description: "Your research paper has been successfully shared.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Medical Research & Knowledge Sharing</h2>
        <Button onClick={() => setShowNewPaperDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Share Research
        </Button>
      </div>
      
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="trending">Trending Papers</TabsTrigger>
          <TabsTrigger value="specialty">Your Specialty</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedPapers.length})</TabsTrigger>
          <TabsTrigger value="yours">Your Papers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending">
          <div className="grid gap-4">
            {researchPapersState.slice(0, 5).map(paper => (
              <ResearchPaperCard 
                key={paper.id} 
                paper={paper} 
                currentUser={currentUser}
                onSave={handleSavePaper}
                onLike={handleLikePaper}
                onComment={() => handleOpenComments(paper.id)}
                onView={() => handleViewPaper(paper)}
                isSaved={savedPapers.includes(paper.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="specialty">
          <div className="grid gap-4">
            {researchPapersState
              .filter(paper => paper.specialty === currentUser.specialty || paper.tags.includes(currentUser.specialty.toLowerCase()))
              .map(paper => (
                <ResearchPaperCard 
                  key={paper.id} 
                  paper={paper} 
                  currentUser={currentUser}
                  onSave={handleSavePaper}
                  onLike={handleLikePaper}
                  onComment={() => handleOpenComments(paper.id)}
                  onView={() => handleViewPaper(paper)}
                  isSaved={savedPapers.includes(paper.id)}
                />
              ))}
            {researchPapersState.filter(paper => paper.specialty === currentUser.specialty || paper.tags.includes(currentUser.specialty.toLowerCase())).length === 0 && (
              <p className="text-center text-muted-foreground py-8">No papers found in your specialty. Check back later or search for specific topics.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="grid gap-4">
            {researchPapersState
              .filter(paper => savedPapers.includes(paper.id))
              .map(paper => (
                <ResearchPaperCard 
                  key={paper.id} 
                  paper={paper} 
                  currentUser={currentUser}
                  onSave={handleSavePaper}
                  onLike={handleLikePaper}
                  onComment={() => handleOpenComments(paper.id)}
                  onView={() => handleViewPaper(paper)}
                  isSaved={true}
                />
              ))}
            {savedPapers.length === 0 && (
              <p className="text-center text-muted-foreground py-8">You haven't saved any papers yet. Browse trending papers and save them for later.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="yours">
          <div className="grid gap-4">
            {researchPapersState
              .filter(paper => paper.author.id === currentUser.id)
              .map(paper => (
                <ResearchPaperCard 
                  key={paper.id} 
                  paper={paper} 
                  currentUser={currentUser}
                  onSave={handleSavePaper}
                  onLike={handleLikePaper}
                  onComment={() => handleOpenComments(paper.id)}
                  onView={() => handleViewPaper(paper)}
                  isSaved={savedPapers.includes(paper.id)}
                />
              ))}
            {researchPapersState.filter(paper => paper.author.id === currentUser.id).length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">You haven't shared any research papers yet.</p>
                <Button className="mt-4" onClick={() => setShowNewPaperDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Share Your Research
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* View Paper Dialog */}
      {selectedPaper && (
        <Dialog open={!!selectedPaper} onOpenChange={(open) => !open && setSelectedPaper(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col overflow-hidden">
            <DialogHeader>
              <DialogTitle>{selectedPaper.title}</DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 overflow-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={selectedPaper.author.avatar} />
                      <AvatarFallback>{selectedPaper.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedPaper.author.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedPaper.author.affiliation}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleSavePaper(selectedPaper.id)}>
                      <Bookmark className={`h-4 w-4 ${savedPapers.includes(selectedPaper.id) ? 'fill-primary' : ''}`} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">Abstract</h3>
                  <p className="text-muted-foreground">{selectedPaper.abstract}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">Methodology</h3>
                  <p className="text-muted-foreground">{selectedPaper.methodology || "Methodology details not available."}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">Results</h3>
                  <p className="text-muted-foreground">{selectedPaper.results || "Results details not available."}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">Conclusion</h3>
                  <p className="text-muted-foreground">{selectedPaper.conclusion || "Conclusion details not available."}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">References</h3>
                  {selectedPaper.references ? (
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {selectedPaper.references.map((reference, index) => (
                        <li key={index}>{reference}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">References not available.</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">Comments ({selectedPaper.comments?.length || 0})</h3>
                  <div className="space-y-3 mt-3">
                    {selectedPaper.comments && selectedPaper.comments.length > 0 ? (
                      selectedPaper.comments.map((comment, index) => (
                        <div key={index} className="flex gap-3 pb-3 border-b last:border-0">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{comment.author}</p>
                              <p className="text-xs text-muted-foreground">{comment.date}</p>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
                    )}
                    
                    <div className="flex items-center gap-2 pt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <Input 
                        className="flex-1" 
                        placeholder="Add a comment..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newComment.trim()) {
                            handleAddComment(selectedPaper.id);
                          }
                        }}
                      />
                      <Button 
                        size="sm" 
                        disabled={!newComment.trim()} 
                        onClick={() => handleAddComment(selectedPaper.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1" 
                    onClick={() => handleLikePaper(selectedPaper.id)}
                  >
                    <ThumbsUp className={`h-4 w-4 ${likedPapers.includes(selectedPaper.id) ? 'fill-primary' : ''}`} />
                    {selectedPaper.likes}
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{selectedPaper.comments?.length || 0} comments</span>
                </div>
                <div className="flex-1" />
                <Button variant="outline" onClick={() => setSelectedPaper(null)}>
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* New Paper Dialog */}
      <Dialog open={showNewPaperDialog} onOpenChange={setShowNewPaperDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Share Research Paper</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={newPaperTitle} 
                onChange={(e) => setNewPaperTitle(e.target.value)} 
                placeholder="Enter research paper title" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="abstract">Abstract</Label>
              <Textarea 
                id="abstract" 
                value={newPaperAbstract} 
                onChange={(e) => setNewPaperAbstract(e.target.value)} 
                placeholder="Enter abstract" 
                rows={5}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input 
                id="tags" 
                value={newPaperTags} 
                onChange={(e) => setNewPaperTags(e.target.value)} 
                placeholder="cardiology, heart disease, treatment" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="file">Upload PDF (Optional)</Label>
              <Input id="file" type="file" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPaperDialog(false)}>Cancel</Button>
            <Button onClick={handleSharePaper} disabled={!newPaperTitle || !newPaperAbstract}>Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Comments Dialog */}
      <Dialog open={commentingPaperId !== null} onOpenChange={() => setCommentingPaperId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-80">
            <div className="space-y-4">
              {commentingPaperId && 
                researchPapersState.find(p => p.id === commentingPaperId)?.comments?.map((comment, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b last:border-0">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))
              }
              
              {commentingPaperId && 
                (!researchPapersState.find(p => p.id === commentingPaperId)?.comments?.length) && (
                  <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
                )
              }
            </div>
          </ScrollArea>
          
          <div className="flex items-center gap-2 pt-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Input 
              className="flex-1" 
              placeholder="Add a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newComment.trim() && commentingPaperId) {
                  handleAddComment(commentingPaperId);
                }
              }}
            />
            <Button 
              size="sm" 
              disabled={!newComment.trim()} 
              onClick={() => commentingPaperId && handleAddComment(commentingPaperId)}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ResearchPaperCardProps {
  paper: ResearchPaper;
  currentUser: {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
  };
  onSave: (paperId: string) => void;
  onLike: (paperId: string) => void;
  onComment: (paperId: string) => void;
  onView: () => void;
  isSaved: boolean;
}

const ResearchPaperCard: React.FC<ResearchPaperCardProps> = ({ paper, currentUser, onSave, onLike, onComment, onView, isSaved }) => {
  return (
    <Card className="bg-card text-card-foreground shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{paper.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <Avatar>
            <AvatarImage src={paper.author.avatar} />
            <AvatarFallback>{paper.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{paper.author.name}</p>
            <p className="text-xs text-muted-foreground">{paper.author.affiliation}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {paper.abstract}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="gap-1" onClick={onLike}>
            <ThumbsUp className={`h-4 w-4 ${likedPapers.includes(paper.id) ? 'fill-primary' : ''}`} />
            {paper.likes}
          </Button>
          <Button variant="ghost" size="sm" className="gap-1" onClick={onComment}>
            <MessageSquare className="h-4 w-4" />
            {paper.comments?.length || 0}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => onSave(paper.id)}>
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-primary' : ''}`} />
          </Button>
          <Button size="sm" onClick={onView}>View</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResearchPaperSharing;
